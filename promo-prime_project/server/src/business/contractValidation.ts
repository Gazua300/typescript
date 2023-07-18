import { Request } from "express"
import { FileFilterCallback } from "multer"
const con = require('../connections/connection')



export const contract_validateFields = (req:Request)=>{
    const { company,  signedAt,  expiresAt, contractName } = req.body

    if(!company || !signedAt || !expiresAt){
        throw{
            statusCode: 401,
            error: new Error('Preencha os campos')
        }
    }

    if(!contractName){
        throw{
            statusCode: 404,
            error: new Error('Selecione o arquivo do contrato')
        }
    }
}


export const contract_validateExistingCP = async(company:string):Promise<void>=>{

    const [existingCP] = await con('promo_prime_contract').where({
        company
    })

    /* const [existingDateSign] = await con('promo_prime_contract').where({
        signedAt,
    })

    const [existingDateExpires] = await con('promo_prime_contract').where({
        expiresAt,
    }) */

    if(existingCP){
        throw{
            statusCode: 401,
            error: new Error('Empresa já foi cadastrada')
        }
    }
}


