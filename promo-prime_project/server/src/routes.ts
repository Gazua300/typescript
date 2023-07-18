import { Router } from "express"
const multer = require('multer')
const { storage } = require('./multerConfig')
const upload = multer({ storage: storage })
const UserController = require('./controllers/UserController')
const ContractController = require('./controllers/ContractController')

const routes = Router()

routes.post('/signup', UserController.signup)
routes.post('/login', UserController.login)
routes.post('/contractFile', upload.single('contract') , ContractController.uploadContracts)
routes.get('/contracts', ContractController.getContracts)
routes.put('/contract/:id', upload.single('contract'), ContractController.editContracts)


module.exports = routes