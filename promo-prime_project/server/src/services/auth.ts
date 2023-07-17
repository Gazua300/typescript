import { Request } from "express"
const con = require('../connections/connection')
const Authentication = require('../services/Authentication')


export const auth = async(req:Request)=>{
    let statusCode = 400 
    const token = req.headers.authorization
    const tokenData = new Authentication().tokenData(token)
    const [user] = await con('promo_prime_users').where({
        id: tokenData.payload
    })
    
    if(!user){
        statusCode = 404
        throw new Error('Usuário não encontrado')
    }

    return user
}