import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import morgan from 'morgan'
import { connectDB, disconnectDB } from './config/confingdb.js'

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
app.use(helmet())
app.use(morgan('dev'))

// Routes
import authRoutes from './routes/authRoutes.js'

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to VintageTone API' })
})

app.use('/api/auth', authRoutes)

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