import Product from '../models/productModel.js'
import { productSchema } from '../schemas/productSchema.js'
import { uploadImage } from '../utils/cloudinary.js'
import fs from 'fs/promises'
import catchAsync from '../utils/catchAsync.js'

export const createProduct = catchAsync(async (req, res) => {
    const validatedData = productSchema.parse(req.body)

    let imagesUrls = []

    if (req.files && req.files.length > 0) {
        // Subir imágenes a Cloudinary
        const uploadPromises = req.files.map(file => uploadImage(file.path, 'products'))
        const results = await Promise.all(uploadPromises)
        imagesUrls = results.map(result => result.secure_url)

        // Limpiar archivos temporales
        const deletePromises = req.files.map(file => fs.unlink(file.path))
        await Promise.all(deletePromises)
    }

    const newProduct = new Product({
        ...validatedData,
        images: imagesUrls.length > 0 ? imagesUrls : validatedData.images,
    })

    const savedProduct = await newProduct.save()

    return res.status(201).json({
        message: 'Producto creado exitosamente',
        product: savedProduct,
    })
})

export const updateProduct = catchAsync(async (req, res) => {
    // Validar datos
    const validatedData = productSchema.partial().parse(req.body)
    const { id } = req.params

    let imagesUrls = []

    if (req.files && req.files.length > 0) {
        // Subir nuevas imágenes
        const uploadPromises = req.files.map(file => uploadImage(file.path, 'products'))
        const results = await Promise.all(uploadPromises)
        imagesUrls = results.map(result => result.secure_url)

        // Limpiar archivos temporales
        const deletePromises = req.files.map(file => fs.unlink(file.path))
        await Promise.all(deletePromises)
    }

    const updatePayload = { ...validatedData }
    if (imagesUrls.length > 0) {
        updatePayload.images = imagesUrls
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        id,
        updatePayload,
        { new: true }
    )

    if (!updatedProduct) {
        return res.status(404).json({ message: 'Producto no encontrado' })
    }

    return res.json({
        message: 'Producto actualizado correctamente',
        product: updatedProduct,
    })
})

export const getProductsById = catchAsync(async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)
    if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' })
    }
    return res.json(product)
})

export const getAllProducts = catchAsync(async (req, res) => {
    let { category, subcategory } = req.query
    if (category) category = category.toLowerCase()
    if (subcategory) subcategory = subcategory.toLowerCase()

    const filter = {}

    if (category)
        filter.category = { $regex: new RegExp(`^${category}$`, 'i') }
    if (subcategory)
        filter.subcategory = { $regex: new RegExp(`^${subcategory}$`, 'i') }

    const products = await Product.find(filter)
    return res.json(products)
})

export const deleteProduct = catchAsync(async (req, res) => {
    const { id } = req.params
    const deletedProduct = await Product.findByIdAndDelete(id)
    if (!deletedProduct) {
        return res.status(404).json({ message: 'Producto no encontrado' })
    }
    return res.json({ message: 'Producto eliminado correctamente' })
})

export const searchProducts = catchAsync(async (req, res) => {
    const { query } = req.query

    if (!query || query.trim() === '') {
        return res.json([])
    }

    const regex = new RegExp(query, 'i')

    const results = await Product.find({
        $or: [
            { name: regex },
            { description: regex },
            { category: regex },
            { subcategory: regex },
            { brand: regex },
        ],
    })

    res.json(results)
})