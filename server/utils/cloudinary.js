import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadImage = async (buffer, filename) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
    });
    try {
         // Convert the buffer to a base64-encoded data URI
         const base64 = `data:image/${filename.split('.').pop()};base64,${buffer.toString("base64")}`;


        const res = await cloudinary.uploader.upload(base64, {
            resource_type: "auto",
        });
        return res;
    } catch (error) {
        console.log("Cloudinary upload error: ", error)   
    }
};


export default uploadImage