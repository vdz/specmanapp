import cloudinary from 'cloudinary';
import { config } from '../config/config.js';
const c = cloudinary;

if (!process.env.CLOOUDINARY_URL) {
    c.config({
        cloud_name : config.CLOUDINARY.name,
        api_key : config.CLOUDINARY.key,
        api_secret : config.CLOUDINARY.s,
    });
}

export function getMediaService() {
    return c;
}