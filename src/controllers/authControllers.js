
export const registerController = (req, res) => {
    try {
        res.json({ message: 'Hiciste una peticion POST a /register' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al registrar usuario' })
    }
}