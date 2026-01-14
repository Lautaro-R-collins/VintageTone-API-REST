import { registerController, profile, logoutUser, loginController, updateAvatar } from '../controllers/authControllers.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import upload from '../middlewares/uploadMiddleware.js'

import express from 'express'

const router = express.Router()

router.post('/register', registerController)

router.post('/login', loginController)

router.post('/logout', logoutUser)

router.get('/profile', profile)

router.put('/upload-avatar', authMiddleware, upload.single('avatar'), updateAvatar)

export default router
