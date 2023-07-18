import { Router } from "express"
const UserController = require('./controllers/UserController')
const ContractController = require('./controllers/ContractController')

const routes = Router()

routes.post('/signup', UserController.signup)
routes.post('/login', UserController.login)
routes.post('/contractFile', ContractController.uploadContracts)
routes.get('/contracts', ContractController.getContracts)
routes.put('/contract/:id', ContractController.editContracts)


module.exports = routes