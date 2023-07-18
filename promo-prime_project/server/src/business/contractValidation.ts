import { Request } from "express"
const con = require('../connections/connection')

export const contract_validateFields = (req:Request)=>{
    const uploadedFile = req.file
    const { company,  signedAt,  expiresAt } = req.body

    if(!company || !signedAt || !expiresAt){
        throw{
            statusCode: 401,
            error: new Error('Preencha os campos')
        }
    }

    if(!uploadedFile){
        throw{
            statusCode: 403,
            error: new Error('Primeiro selecione o arquivo')
        }
    }
}


export const contract_validateExistingCP = async(company:string):Promise<void>=>{
    const [existedCP] = await con('promo_prime_contract').where({
        company
    })

    if(existedCP){
        throw{
            statusCode: 401,
            error: new Error('Empresa já foi cadastrada')
        }
    }
}