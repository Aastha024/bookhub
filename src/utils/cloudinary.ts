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
            folder: `booklist/${folderName}`,
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

export { uploadOnCloudinary, uploadPDFOnCloudinary };