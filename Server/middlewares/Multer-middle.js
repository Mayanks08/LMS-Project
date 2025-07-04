import path from "path";
import multer from "multer"

const upload = multer({
    dest:"uploads/",
    limits: {fileSize:50*1024*1020}, // this equal to 50mb
    storage:multer.diskStorage({
        destination:"uploads/",
        filename:(_req,file,cb) =>{
           cb(null,file.originalname)
        }
    }),
    fileFilter:(_req,file,cb) =>{
        let ext = path.extname(file.originalname);

        if(
            ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg" && ext !== ".webg"
        ){
             cb(new Error(`"Only image files are allowed" ${ext}`), false)
             return;
        }
        cb(null,true)
    }
})

export default upload