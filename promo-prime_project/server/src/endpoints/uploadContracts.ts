import { Request, Response } from 'express'
import { auth } from '../services/auth'
const con = require('../connections/connection')
const Authentication = require('../services/Authentication')



const uploadContracts = async(req:Request, res:Response)=>{
    let statusCode = 400
    try{
        
        const user = await auth(req)
        const uploadedFile = req.file
        const { company,  signedAt,  expiresAt,  contractName} = req.body
    console.log(uploadedFile)    
        if(!company || !signedAt || !expiresAt || !contractName){
            statusCode = 401
            throw new Error('Preencha os campos')
        }

        
        const [existedCP] = await con('promo_prime_contract').where({
            company
        })

        if(existedCP){
            statusCode = 403
            throw new Error('Empresa já foi cadastrada')
        }
        
                
        if(!uploadedFile){
            statusCode = 403
            throw new Error('Primeiro selecione o arquivo')
        }
        
        const fileData = uploadedFile.buffer


        await con('promo_prime_contract').insert({
            id: new Authentication().generateId(),
            company,
            signedAt,
            expiresAt,
            contractName,
            user_id: user.id
        })

        await con('promo_prime_tasks').insert({
            id: new Authentication().generateId(),
            user: user.name,
            email: user.email,
            moment: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
            task: `Adicionou o contrato da empresa ${company}`
        })
        

        res.status(200).send('Arquivo enviado com sucesso')
    }catch(e:any){
        res.status(statusCode).send(e.message)
    }
}

module.exports = uploadContracts