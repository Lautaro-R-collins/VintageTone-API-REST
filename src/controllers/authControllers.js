// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const userModel = require('../models/UserModel.js')
// const { catchAsync } = require('../utils/catchAsync.js')

// const registerUser = catchAsync(async (req, res) => {
//     // validacion handler middleware
//     const { email, password, username } = req.body

//     // comprobar si existe
//     const existingUser = await userModel.findOne({ email })
//     if (existingUser) {
//         return res.status(400).json({ error: 'El usuario ya existe' })
//     }

//     // encriptar contraseña
//     const hashedPassword = await bcrypt.hash(password, 10)

//     // comprobar admin
//     const isAdminUser = email === process.env.ADMIN_EMAIL

//     // crear usuario
//     const newUser = new userModel({
//         username,
//         email,
//         password: hashedPassword,
//         isAdmin: isAdminUser,
//     })

//     await newUser.save()

//     // generar token JWT
//     const token = jwt.sign(
//         { userId: newUser._id, isAdmin: newUser.isAdmin },
//         process.env.JWT_SECRET,
//         { expiresIn: '1h' }
//     )

//     // enviar cookie segura
//     res.cookie('token', token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         maxAge: 3600000,
//         sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
//     })

//     // enviar respuesta final
//     return res.status(201).json({
//         message: 'Usuario registrado exitosamente',
//         token,
//         user: {
//             id: newUser._id,
//             username: newUser.username,
//             email: newUser.email,
//             isAdmin: newUser.isAdmin,
//         },
//     })
// })

// const loginUser = catchAsync(async (req, res) => {
//     const { email, password } = req.body

//     // buscar usuario
//     const user = await userModel.findOne({ email })
//     if (!user) {
//         return res.status(400).json({ error: 'Credenciales inválidas' })
//     }

//     // comparar contraseñas
//     const isPasswordValid = await bcrypt.compare(password, user.password)
//     if (!isPasswordValid) {
//         return res.status(400).json({ error: 'Credenciales inválidas' })
//     }

//     // generar token
//     const token = jwt.sign(
//         {
//             userId: user._id,
//             isAdmin: user.isAdmin,
//         },
//         process.env.JWT_SECRET,
//         { expiresIn: '2h' }
//     )

//     // enviar cookie
//     const userData = {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//         isAdmin: user.isAdmin,
//     }

//     res.cookie('token', token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         maxAge: 7200000,
//         sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
//     })
//         .status(200)
//         .json({
//             message: 'Inicio de sesión exitoso',
//             token,
//             user: userData,
//         })
// })

// const logoutUser = (req, res) => {
//     res.clearCookie('token', {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
//     })
//     res.status(200).json({ message: 'Usuario deslogueado exitosamente' })
// }

// module.exports = {
//     registerUser,
//     loginUser,
//     logoutUser,
// }