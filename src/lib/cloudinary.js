import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

/**
 * Upload an image to Cloudinary
 * @param {string} fileUri - Data URI of the image
 * @param {string} folder - Folder name in Cloudinary
 */
export async function uploadImage(fileUri, folder = "restaurant-menu") {
  try {
    const result = await cloudinary.uploader.upload(fileUri, {
      folder: folder,
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
}
