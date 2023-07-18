import { Router } from "express"
const UserController = require('./controllers/UserController')
const ContractController = require('./controllers/ContractController')
const { uploadContract, uploadEditContract } = require('./multerConfig')


const routes = Router()

routes.post('/signup', UserController.signup)
routes.post('/login', UserController.login)
routes.post('/contractFile', uploadContract.single('contract') , ContractController.uploadContracts)
routes.get('/contracts', ContractController.getContracts)
routes.put('/contract/:id', uploadEditContract.single('contract'), ContractController.editContracts)


module.exports = routes