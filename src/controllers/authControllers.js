import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { registerSchema } from "../schemas/authSchema.js";
import UserModel from "../models/UserModel.js";

export const registerController = async (req, res) => {
    try {
        // clave secreta para generar el token
        const JWT_SECRET = process.env.JWT_SECRET
        // datos del usuario
        const { userName, email, password } = registerSchema.parse(req.body)
        // Comprobar si el usuario ya existe
        const userExists = await UserModel.findOne({ email })

        if (userExists) {
            return res.status(400).json({ message: 'El usuario ya existe' })
        }
        // Comprobar si es admin
        const isAdmin = email === process.env.USER_ADMIN;

        // hashear la contraseña
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // crear el usuario
        const user = await UserModel.create({
            userName,
            email,
            password: hashedPassword,
            isAdmin
        })
        // generar el token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' })
        // guardar el token en un cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000
        })

        // devolver el token
        res.json({ token })


    } catch (error) {
        console.log("Error en registerController:", error)
        res.status(500).json({ message: 'Error al registrar usuario' })
    }
}