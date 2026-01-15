import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

// storage for temporary files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/avatars')
    },
    filename: (req, file, cb) => {
        // Nombre de archivo único: timestamp + uuid + extensión original
        const extension = path.extname(file.originalname)
        cb(null, `${Date.now()}-${crypto.randomUUID()}${extension}`)
    }
})

// file filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('Formato de archivo no permitido. Solo se aceptan JPEG, JPG, PNG y WEBP.'), false)
    }
}

// multer initialization
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024 // 2MB limit
    }
})

export default upload
