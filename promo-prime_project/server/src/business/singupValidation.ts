import { Request } from "express"
import { Role } from "../endpoints/signup"
const con = require('../connections/connection')


export const validateFields = (req:Request):void=>{
    const { username, email, password, confirmPass, role } = req.body;
    if (!username || !email || !password || !confirmPass || !role) {
        throw {
            statusCode: 401,
            error: new Error('Preencha os campos')
        }
    }
}

export const validateRole = (role:Role):void=>{
    if(role !== 'DEFAULT' && role !== 'ADM'){
        throw {
            statusCode: 401,
            error: new Error('Escolha um tipo de usuário válido: ADM ou Padrão')
        } 
    }
}

export const validatePassword = (password:string, confirmPass:string):void=>{
    if(password.length < 6){
        throw {
            statusCode: 403,
            error: new Error('Sua senha deve ter um mínimo de 6 caractéres')
        }
    }

    if(password !== confirmPass){
        throw {
            statusCode: 403,
            error: new Error('As senhas não correspodem')
        }
    }
}

export const validateUser = async(role:string, email:string):Promise<void>=>{
    const [userADM] = await con('promo_prime_users').where({
        user: `ADM`
    })

    if(userADM && role === `ADM`){
        throw {
            statusCode: 403,
            error: new Error('Já existe um usuário ADM')
        }
    }
    
    const [user] = await con('promo_prime_users').where({
        email
    })

    if(user){
        throw {
            statusCode: 403,
            error: new Error('Usuário já cadastrado')
        }
    }
}