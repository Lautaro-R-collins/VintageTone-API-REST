import { registerController, profile, logoutUser, loginController } from '../controllers/authControllers.js'


import express from 'express'

const router = express.Router()

router.post('/register', registerController)

router.post('/login', loginController)

router.post('/logout', logoutUser)

router.get('/profile', profile)

export default router
