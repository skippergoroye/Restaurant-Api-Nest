import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';
config();

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'restaurants',
    allowed_formats: ['jpg', 'png', 'jpeg', 'csv', 'pdf'],
  } as any,
});

export const multerConfig: MulterOptions = {
  storage,
};