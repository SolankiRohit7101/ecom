import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return console.log("null from here");

    const response = await cloudinary.uploader.upload(localFilePath, {
      public_id: "avatar" + Date.now(),
      resource_type: "auto",
    });
    console.log(response.url);
    console.log("file is uploaded in cloudinary");
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.log(error);
    fs.unlinkSync(localFilePath); //remove the locally saved file as the upload fail
    return null;
  }
};

export default uploadCloudinary;
