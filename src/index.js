require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { connectDB, disconnectDB } = require('./config/confingdb.js')

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
const authRoutes = require('./routes/authRoutes.js')

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