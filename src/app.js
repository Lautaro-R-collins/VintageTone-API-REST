const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const rateLimit = require('express-rate-limit')

const app = express()

// Configuración de rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Límite de 100 requests por IP
    message: 'Demasiadas peticiones desde esta IP, intenta de nuevo más tarde.',
})

// Middlewares de seguridad y utilidades
app.use(helmet()) // Seguridad HTTP headers
app.use(cors()) // CORS
app.use(morgan('dev')) // Logging de requests
app.use(express.json()) // Parsear JSON
app.use(express.urlencoded({ extended: true })) // Parsear URL-encoded
app.use(cookieParser()) // Parsear cookies
app.use(limiter) // Rate limiting

// Rutas básicas
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to VintageTone API' })
})

// TODO: Aquí irán las rutas de autenticación y otras rutas
// app.use('/api/auth', authRoutes)
// app.use('/api/products', productRoutes)

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' })
})

// Manejo global de errores
app.use((err, req, res, next) => {
    console.error('Error:', err)
    res.status(err.status || 500).json({
        error: err.message || 'Error interno del servidor',
    })
})

module.exports = app
