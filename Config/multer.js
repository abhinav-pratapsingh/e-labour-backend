import multer from "multer";
import path from "path";

const uploadPath = path.join(process.cwd()+"/uploads");

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,uploadPath);
    },
    filename: (req,file,cb)=>{
        cb(null,`image-${Date.now()}-${file.originalname}`);
    }
});

const Upload = multer({storage});

export default Upload;