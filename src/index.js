require('dotenv').config()
const app = require('./app.js')
const { connectDB, disconnectDB } = require('./config/confingdb.js')

const PORT = process.env.PORT || 3000

// Variable para el servidor
let server

// Conexión a la BD e inicio del servidor
connectDB()
    .then(() => {
        server = app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`)
        })
    })
    .catch((error) => {
        console.error('Error al iniciar el servidor:', error)
        disconnectDB()
        process.exit(1)
    })

// Manejo de señales para cierre graceful
const gracefulShutdown = async (signal) => {
    console.log(`\n${signal} recibido. Cerrando servidor...`)
    if (server) {
        server.close(async () => {
            console.log('Servidor cerrado')
            await disconnectDB()
            process.exit(0)
        })
    }
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
process.on('SIGINT', () => gracefulShutdown('SIGINT'))
