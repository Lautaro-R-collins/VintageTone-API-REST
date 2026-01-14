import jwt from 'jsonwebtoken'
import catchAsync from '../utils/catchAsync.js'

const authMiddleware = catchAsync(async (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ message: 'No hay token, autorización denegada' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.userId
    next()
})

export default authMiddleware
