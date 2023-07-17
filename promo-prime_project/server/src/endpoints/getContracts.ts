import { Request, Response } from "express"
const con = require('../connections/connection')
const { auth } = require('../services/auth')



const getContracts = async(req:Request, res:Response):Promise<void>=>{
    let statusCocde = 400
    try{
        
        await auth(req)
        
        const contracts = await con('promo_prime_contract') 

        res.status(200).send(contracts)
    }catch(e:any){
        res.status(statusCocde).send(e.message || e.sqlMessage)
    }
}

module.exports = getContracts