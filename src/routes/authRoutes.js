const express = require('express')

const {
    registerUser,
    // loginUser,
    // logoutUser,
} = require('../controllers/authControllers.js')

const { validateSchema } = require('../middlewares/validationMiddleware.js')
const { registerSchema, loginSchema } = require('../schemas/authSchema.js')

const router = express.Router()

router.post('/register', validateSchema(registerSchema), registerUser)
// router.post('/login', validateSchema(loginSchema), loginUser)
// router.post('/logout', logoutUser)

module.exports = router