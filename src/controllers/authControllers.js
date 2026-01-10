
export const registerController = (req, res) => {
    try {
        const JWT_SECRET = process.env.JWT_SECRET

        const { userName, email, password } = req.body
        console.log(userName, email, password)

        

       
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al registrar usuario' })
    }
}