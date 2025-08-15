import { v2 as cloudinary } from 'cloudinary'

const connectCloudinary = async() => {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      throw new Error("Cloudinary environment variables are missing!")
    }

    cloudinary.config({ 
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY, 
      api_secret: process.env.CLOUDINARY_API_SECRET
    });

    console.log("Cloudinary connected");
  } catch (error) {
    console.error("Cloudinary connection error:", error.message);
  }
}

export default connectCloudinary
