import { StorageEngine, diskStorage } from "multer"
import { editContract_fileFilter } from "./business/editContractValidation"
const multer = require("multer")



const storage:StorageEngine = diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './src/uploads')
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    }
})


const uploadContract = multer({ storage: storage })
const uploadEditContract = multer({ storage: storage, fileFilter: editContract_fileFilter })

module.exports = { uploadContract, uploadEditContract }