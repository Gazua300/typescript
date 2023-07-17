import { Request } from "express"
const con = require('../connections/connection')
const Authentication = require('../services/Authentication')

export const login_validateFields = (req:Request)=>{
    const { email, password } = req.body

    if(!email || !password){
        throw {
            statusCode: 401,
            error: new Error('Preencha os campos')
        }
    }
}

export interface User{
    id:string
    name:string
    email:string
    password:string
    user:string
}

export const login_vavalidateUserCredentials = async(
    user:User,
    auth:Authentication,
    password:string
):Promise<void>=>{    

    if(!user){
        throw{
            statusCode: 404,
            error: new Error('Usuário não encontrado')
        }
    }

    const compare = auth.compare(password, user.password)
    if(!compare){
        throw{
            statusCode: 404,
            error: new Error('Usuário não encontrado')
        }
    }
}