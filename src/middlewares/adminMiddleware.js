import UserModel from '../models/UserModel.js';
import catchAsync from '../utils/catchAsync.js';

const adminMiddleware = catchAsync(async (req, res, next) => {
    const user = await UserModel.findById(req.userId);

    if (!user || !user.isAdmin) {
        return res.status(403).json({ message: 'Acceso denegado. Se requieren permisos de administrador.' });
    }

    next();
});

export default adminMiddleware;
