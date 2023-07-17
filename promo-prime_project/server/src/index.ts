import { Application } from "express"
const express = require('express')
const cors = require('cors')
const multer = require('multer')
const { storage } = require('./multerConfig')
const upload = multer({ storage: storage })
const routes = require('./routes')


class Index{
    public app:Application
    
    public constructor(){
        this.app = express()
        this.middlewares()
        this.routes()
    }
    
    private middlewares():void{
        this.app.use(express.json())
        this.app.use(cors())
        this.app.use('/files', express.static('src/uploads'))
    }

    private routes():void{
        this.app.use(routes)
    }
    
}


const index = new Index()
index.app.listen(3003, ()=>{
    console.log('Server running at http://localhost:3003')
})