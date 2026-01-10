import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB, disconnectDB } from './config/confingdb.js'

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

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