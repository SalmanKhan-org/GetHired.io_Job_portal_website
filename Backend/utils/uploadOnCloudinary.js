import cloudinary from "./cloudinary.js";

export const uploadOnCloudinary = async (file) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                resource_type: 'raw',
                folder: 'getHiredIO',
                access_mode: 'public',
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url);
            }
        ).end(file.buffer);
    });
};

