import { Request } from "express"

export const editContractsValidationFields = (req:Request):void=>{
    const uploadedFile = req.file    
    const { company, signedAt, expiresAt, contractName, contractUpdates } = req.body
    if(!company || !signedAt || !expiresAt){
        throw{
            statusCode: 401,
            error: new Error('Preencha os campos')
        }
    }
}