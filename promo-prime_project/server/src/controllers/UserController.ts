const con = require('../connections/connection')
const Authentication = require('../services/Authentication')
import { Request, Response } from "express"
import {
    validateFields,
    validatePassword,
    validateRole,
    validateUser
} from "../business/singupValidation"
import {
    login_validateFields,
    login_vavalidateUserCredentials
} from "../business/loginValidation"



//let statusCode:number = 400

class UserController{

    public async signup (req:Request, res:Response):Promise<void>{
        try{

            const { username, email, password, confirmPass, role } = req.body
            const auth = new Authentication()
            
            const id = auth.generateId()
            const token = auth.token(id)
    
            validateFields(req)
            validateRole(role)
            validatePassword(password, confirmPass)
            await validateUser(role, email)
    
            await con('promo_prime_users').insert({
                id,
                name: username,
                email,
                password: auth.hash(password),
                user: role
            })
    
            res.status(201).send({token, user: role})
        }catch(e:any){
            const statusCode = e.statusCode || 400
            const message = e.error.message
            res.status(statusCode).send(message || e.sqlMessage)
        }
    }


    public async login(req:Request, res:Response):Promise<void>{
        try{

            const auth = new Authentication()
            const { email, password } = req.body

            login_validateFields(req)  
            
            
            const [user] = await con('promo_prime_users').where({
                email
            })

            await login_vavalidateUserCredentials(user, auth, password)
            const token = auth.token(user.id)
    
    
            res.status(200).send({token, user: user.user})
        }catch(e:any){
            const statusCode = e.statusCode || 400
            const message = e.error.message
            res.status(statusCode).send(message || e.sqlMessage)
        }
    }
}

module.exports = new UserController()