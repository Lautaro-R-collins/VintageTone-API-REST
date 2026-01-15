import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import morgan from 'morgan'
import { connectDB, disconnectDB } from './config/confingdb.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'Set-Cookie'],
        credentials: true
    }
))
app.use(express.json())
app.use(cookieParser())
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}))
app.use(morgan('dev'))

// Servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Routes
import authRoutes from './routes/authRoutes.js'
import productsRoutes from './routes/productsRoutes.js'

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to VintageTone API' })
})

app.use('/api/auth', authRoutes)
app.use('/api/products', productsRoutes)

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack)

    // Manejar errores de validación de Zod
    if (err.name === 'ZodError') {
        return res.status(400).json({
            message: 'Datos de entrada inválidos',
            errors: (err.issues || err.errors || []).map(e => ({
                path: e.path,
                message: e.message
            }))
        })
    }

    // Errores de JWT
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Token inválido' })
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expirado' })
    }

    // Error por defecto
    res.status(err.status || 500).json({
        message: err.message || 'Error interno del servidor'
    })
})

// Conexión a la BD
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`)
        })
    })
    .catch((error) => {
        console.error('Error al iniciar el servidor:', error)
        disconnectDB()
    })