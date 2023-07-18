import { FileFilterCallback, StorageEngine, diskStorage } from "multer"
const multer = require("multer")
const con = require('./connections/connection')

type FileFilterFunction = (
    req:Request,
    file:Express.Multer.File,
    cb:FileFilterCallback
) => void


const getFilenameFromDatabase:FileFilterFunction = async(req, file, cb)=>{    
    const [filename] = await con('promo_prime_contract').where({
        contractName: file.originalname
    })

    if(filename){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

const storage:StorageEngine = diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './src/uploads')
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    }
})


const upload = multer({ storage: storage, fileFilter: getFilenameFromDatabase })

module.exports = upload