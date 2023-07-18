import { StorageEngine, diskStorage } from "multer"


const storage:StorageEngine = diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './src/uploads')
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    }
})

module.exports = storage