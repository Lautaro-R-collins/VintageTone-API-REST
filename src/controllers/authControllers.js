import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { registerSchema, loginSchema } from "../schemas/authSchema.js";
import UserModel from "../models/UserModel.js";
import catchAsync from "../utils/catchAsync.js";

// Opciones comunes para las cookies
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    maxAge: 3600000 // 1 hora
}

export const registerController = catchAsync(async (req, res) => {
    const JWT_SECRET = process.env.JWT_SECRET
    const { userName, email, password } = registerSchema.parse(req.body)

    const userExists = await UserModel.findOne({ email })
    if (userExists) {
        return res.status(400).json({ message: 'El usuario ya existe' })
    }

    const isAdmin = email === process.env.USER_ADMIN;

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await UserModel.create({
        userName,
        email,
        password: hashedPassword,
        isAdmin
    })

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' })

    res.cookie('token', token, cookieOptions)

    res.status(201).json({
        message: 'Usuario registrado exitosamente',
        userData: {
            id: user._id,
            userName: user.userName,
            email: user.email,
            isAdmin: user.isAdmin,
            avatar: user.avatar,
        },
        token
    })
})

export const loginController = catchAsync(async (req, res) => {
    const JWT_SECRET = process.env.JWT_SECRET
    const { email, password } = loginSchema.parse(req.body)

    const user = await UserModel.findOne({ email })
    const genericError = 'Email o contraseña incorrectos'

    if (!user) {
        return res.status(401).json({ message: genericError })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return res.status(401).json({ message: genericError })
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' })

    res.cookie('token', token, cookieOptions)

    res.json({
        message: 'Inicio de sesión exitoso',
        userData: {
            id: user._id,
            userName: user.userName,
            email: user.email,
            isAdmin: user.isAdmin,
            avatar: user.avatar,
        },
        token
    })
})

export const profile = catchAsync(async (req, res) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ error: 'No autenticado' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await UserModel.findById(decoded.userId)
    if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    return res.status(200).json({
        id: user._id,
        userName: user.userName,
        email: user.email,
        isAdmin: user.isAdmin,
        avatar: user.avatar,
    })
})

export const logoutUser = (req, res) => {
    res.clearCookie('token', {
        ...cookieOptions,
        maxAge: 0
    })
    res.status(200).json({ message: 'Usuario deslogueado exitosamente' })
}

export const updateAvatar = catchAsync(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Por favor, sube una imagen' })
    }

    // El path que guardamos es relativo para poder servirlo estáticamente
    // reemplazamos 'src/' para que la URL sea /uploads/avatars/...
    const avatarPath = req.file.path.replace('src/', '')

    const user = await UserModel.findByIdAndUpdate(
        req.userId,
        { avatar: avatarPath },
        { new: true }
    )

    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    res.json({
        message: 'Avatar actualizado correctamente',
        avatar: user.avatar
    })
})