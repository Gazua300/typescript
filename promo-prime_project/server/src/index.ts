import { Application, Router } from "express"
const express = require('express')
const cors = require('cors')
const multer = require('multer')
const { storage } = require('./multerConfig')
const upload = multer({ storage: storage })


class Index{
    public app:Application
    private signup:Router = require('./endpoints/signup')
    private login:Router = require('./endpoints/login')
    private contracts:Router = require('./endpoints/getContracts')
    private uploadContracts:Router = require('./endpoints/uploadContracts')
    
    public constructor(){
        this.app = express()
        this.middlewares()
        this.routeLogin()
        this.routeSignup()
        this.routeContracts()
        this.routeContractFile()
    }
    
    private middlewares():void{
        this.app.use(express.json())
        this.app.use(cors())
        this.app.use('/files', express.static('src/uploads'))
    }

    private routeLogin():void{
        this.app.post('/login', this.login)
    }

    private routeSignup():void{
        this.app.post('/signup', this.signup)
    }

    private routeContracts():void{
        this.app.get('/contracts', this.contracts)
    }

    private routeContractFile():void{
        this.app.post('/contractFile', upload.single('contract'), this.uploadContracts)
    }
    
}


const index = new Index()
index.app.listen(3003, ()=>{
    console.log('Server running at http://localhost:3003')
})