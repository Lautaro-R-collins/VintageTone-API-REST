import Review from '../models/reviewModel.js'
import User from '../models/UserModel.js'
import Product from '../models/productModel.js'

export const getReviewsByProduct = async (req, res) => {
    try {
        const { productId } = req.params
        const reviews = await Review.find({ productId }).sort({ createdAt: -1 })

        res.status(200).json(reviews)
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo reseñas' })
    }
}

export const createReview = async (req, res) => {
    try {
        const { productId } = req.params
        const { rating, comment } = req.body
        const userId = req.userId

        // Verificar si el producto existe
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' })
        }

        // Verificar si el usuario ya dejó una reseña para este producto
        const existingReview = await Review.findOne({ productId, userId })
        if (existingReview) {
            return res
                .status(400)
                .json({ error: 'Ya has dejado una reseña para este producto' })
        }

        const user = await User.findById(userId).select('userName')
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' })
        }

        const review = new Review({
            productId,
            userId,
            username: user.userName,
            rating,
            comment,
        })

        await review.save()

        res.status(201).json({ message: 'Reseña publicada', review })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'No se pudo crear la reseña' })
    }
}
