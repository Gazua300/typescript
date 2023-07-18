import { Request } from "express"
import { convertContractDate, convertDate } from "../services/dateConverstions"

export const editContractsValidateFields = (req:Request):void=>{
    const uploadedFile = req.file    
    const { company, signedAt, expiresAt, contractName, contractUpdates } = req.body
    
    if(!company || !signedAt || !expiresAt){
        throw{
            statusCode: 401,
            error: new Error('Preencha os campos')
        }
    }
}


interface UploadedFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    buffer: Buffer;
}

export const editContractsValidateEdition = async(
    req:Request,
    company:string,
    signedAt:string,
    expiresAt:string,
    uploadedFile:UploadedFile,
    contractUpdates:string,
    updateFields:string[]
):Promise<void>=>{


    const [contract] = await con('promo_prime_contract').where({
        id: req.params.id
    })

    if(company !== contract.company){
        updateFields.push(`Alteração no nome da empresa de ${contract.company} para ${company}`)
    }

    if(convertDate(signedAt) !== convertContractDate(contract.signedAt)){
        updateFields.push(`Alteração na data da assinatura no contrato da empresa ${company} de ${convertContractDate(contract.signedAt)} para ${convertDate(signedAt)}`)
    }

    if(convertDate(expiresAt) !== convertContractDate(contract.expiresAt)){
        updateFields.push(`Alteração na data da expiração no contrato da empresa ${company} de ${convertContractDate(contract.expiresAt)} para ${convertDate(expiresAt)}`)
    }

    if(uploadedFile){
        if(contractUpdates === ''){
            throw{
                statusCode: 403,
                error: new Error('Especifique as mudanças do contrato')
            }
        }else{
            updateFields.push(contractUpdates)
        }
    } 
}