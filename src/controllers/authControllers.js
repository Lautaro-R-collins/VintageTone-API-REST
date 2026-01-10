
export const registerController = (req, res) => {
    try {
        const JWT_SECRET = process.env.JWT_SECRET
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: 'Faltan datos' })
        }

        const user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({ message: 'Usuario ya existe' })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            email,
            password: hashPassword
        })

        await newUser.save()

        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' })

        res.status(200).json({ token })

        console.log(token)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al registrar usuario' })
    }
}