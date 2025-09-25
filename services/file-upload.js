import cloudinay from "../Config/cloudinary.js";
import fs from "fs";

const fileUpload = async (file,folder="uploads")=>{
    try{
        const result = await cloudinay.uploader.upload(file.path,{folder:folder});
        fs.unlinkSync(file.path);
        return {url:result.secure_url,publicId:result.public_id}
    }
    catch(e){
        fs.unlinkSync(file.path);
        throw new Error(`error in uploading file = ${e}`);
    }
}

export default fileUpload;