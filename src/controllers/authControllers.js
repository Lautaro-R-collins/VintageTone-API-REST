
export const registerController = (req, res) => {
    try {
        const JWT_SECRET = process.env.JWT_SECRET

        const { userName, email, password } = req.body
        console.log("Datos recibidos en /register:", { userName, email, password })

        res.status(200).json({
            message: "Datos recibidos correctamente",
            data: { userName, email }
        })
    } catch (error) {
        console.log("Error en registerController:", error)
        res.status(500).json({ message: 'Error al registrar usuario' })
    }
}