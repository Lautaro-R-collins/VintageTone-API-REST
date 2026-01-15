import express from 'express'
import {
    createProduct,
    updateProduct,
    getProductsById,
    getAllProducts,
    deleteProduct,
    searchProducts,
} from '../controllers/productControllers.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import adminMiddleware from '../middlewares/adminMiddleware.js'
import upload from '../middlewares/multerMiddleware.js'

const router = express.Router()

// ===============
// RUTAS PÚBLICAS
// ===============

router.get('/search', searchProducts)
router.get('/', getAllProducts)
router.get('/:id', getProductsById)

// ============================
// RUTAS PRIVADAS (solo admin)
// ============================

router.post(
    '/',
    authMiddleware,
    adminMiddleware,
    upload.array('images', 5),
    createProduct
)
router.put(
    '/:id',
    authMiddleware,
    adminMiddleware,
    upload.array('images', 5),
    updateProduct
)
router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct)

export default router