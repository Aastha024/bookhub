import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Function to upload an image to Cloudinary
const uploadOnCloudinary = async (localpath: string, folderName: string) => {
    try{
        const uploadResult = await cloudinary.uploader.upload(localpath, {
            resource_type: 'auto',
            folder: `book/${folderName}`,
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        });
        fs.unlinkSync(localpath); 
        return uploadResult

    }catch (error) {
        fs.unlinkSync(localpath); 
        console.error("Error uploading to Cloudinary:", error);
        throw new Error("Cloudinary upload failed");
    }    
}

// Function to delete an image from Cloudinary
const deleteOnCloudinary = async (public_id: string) => {
    try{
        const uploadResult = await cloudinary.uploader.destroy(public_id, async result => {
            console.log("result", result);
        });
        return uploadResult

    }catch (error) {
        console.error("Error deleting to Cloudinary:", error);
        throw new Error("Cloudinary image delete failed");
    }    
}

const uploadPDFOnCloudinary = async (localpath: string) => {
    try{
        const uploadResult = await cloudinary.uploader.upload(localpath, {
            resource_type: 'raw',
            folder: `pdfs`,
            
        });
        // fs.unlinkSync(localpath); 
        return uploadResult
    } catch (error){
        fs.unlinkSync(localpath);
        console.error("Error uploading PDF to Cloudinary:", error);
        throw new Error("Cloudinary PDF upload failed");
    }
}

export { uploadOnCloudinary, deleteOnCloudinary, uploadPDFOnCloudinary };