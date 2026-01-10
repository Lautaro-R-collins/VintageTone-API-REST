import { registerController } from '../controllers/authControllers.js'


import express from 'express'

const router = express.Router()

router.post('/register', registerController)

router.post('/login', (req, res) => {
    console.log('Hiciste una peticion POST a /login')
    res.json({ message: 'Hiciste una peticion POST a /login' })
})

router.post('/logout', (req, res) => {
    console.log('Hiciste una peticion POST a /logout')
    res.json({ message: 'Hiciste una peticion POST a /logout' })
})

router.get('/profile', (req, res) => {
    console.log('Hiciste una peticion GET a /profile')
    res.json({ message: 'Hiciste una peticion GET a /profile' })
})

export default router
