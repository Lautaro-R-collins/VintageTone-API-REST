import cloudinary from '../config/cloudinary.js';

/**
 * Uploads an image to Cloudinary
 * @param {string} filePath - Path to the local file
 * @param {string} folder - Folder name in Cloudinary
 * @returns {Promise<object>} - Cloudinary upload response
 */
export const uploadImage = async (filePath, folder = 'products') => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: `vintagetone/${folder}`,
            use_filename: true,
            unique_filename: true,
            overwrite: false,
        });
        return result;
    } catch (error) {
        throw new Error(`Cloudinary upload failed: ${error.message}`);
    }
};

/**
 * Deletes an image from Cloudinary
 * @param {string} publicId - Public ID of the image
 * @returns {Promise<object>} - Cloudinary deletion response
 */
export const deleteImage = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        throw new Error(`Cloudinary deletion failed: ${error.message}`);
    }
};
