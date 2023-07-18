import { Request } from "express"
import { FileFilterFunction, UploadedFile } from "./editContractValidation"
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


let changes:boolean = false

export const contract_validateExistingCP = async(
    company:string, expiresAt:string, signedAt:string
):Promise<void>=>{
    
    const [existingCP] = await con('promo_prime_contract').where({
        company
    })

    const [existingDateSign] = await con('promo_prime_contract').where({
        signedAt,
    })

    const [existingDateExpires] = await con('promo_prime_contract').where({
        expiresAt,
    })

    if(existingCP){  
        if(!existingDateExpires || !existingDateSign){
            changes = true
            throw{
                status: 403,
                error: new Error('Datas não conferem. Caso queira realizar mudanças no contrato vá até a sessão de edição')
            }
        }else{
            throw{
                statusCode: 401,
                error: new Error('Empresa já foi cadastrada')
            }
        }
    }else{
        changes = true
        throw{
            statusCode: 403,
            error: new Error('Nome da empresa não confere. Caso queira realizar mudanças no contrato vá até a sessão de edição')
        }
    }
}


export const contract_fileFilter:FileFilterFunction = async(req, file, cb):Promise<void>=>{
    let statusCode = 400
    try{
        
        console.log(file)
        const [existingFile] = await con('promo_prime_contract').where({
            contractName: file.originalname
        })
    console.log(changes)
        if(!existingFile && !changes){
            statusCode = 401
            throw new Error('Arquivo de contrato não confere')
        }
    }catch(e:any){
        cb(e, false)
        console.log(e)
    }
}


