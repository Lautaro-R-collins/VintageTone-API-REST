import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

// storage for temporary files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/temp');
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        cb(null, `${Date.now()}-${crypto.randomUUID()}${extension}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Format not allowed. Only JPEG, JPG, PNG and WEBP are accepted.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

export default upload;
