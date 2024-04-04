import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export const deleteCloudinary = async (imageName) => {
  try {
    if (!imageName) return null;
    await cloudinary.uploader.destroy(imageName, (error, result) =>
      console.log(error, result)
    );
  } catch (error) {
    console.log(error);
  }
};

const uploadCloudinary = async (localFilePath, imageName) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      public_id: imageName + Date.now(),
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove the locally saved file as the upload fail
    console.log(error);
    return null;
  }
};

export default uploadCloudinary;
