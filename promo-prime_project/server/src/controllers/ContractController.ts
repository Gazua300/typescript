import { Request, Response } from "express"
import { contract_validateExistingCP, contract_validateFields } from "../business/contractValidation"
import { editContractsValidateEdition, editContractsValidateFields } from "../business/editContractValidation"
const con = require('../connections/connection')
const { auth } = require('../services/auth')
const Authentication = require('../services/Authentication')



class ContractController{
    
    public async getContracts(req:Request, res:Response):Promise<void>{
        try{
        
            await auth(req)
            
            const contracts = await con('promo_prime_contract') 
    
            res.status(200).send(contracts)
        }catch(e:any){
            let statusCocde = 400
            res.status(statusCocde).send(e.message || e.sqlMessage)
        }
    }


    public async uploadContracts(req:Request, res:Response):Promise<void>{
        try{
        
            const user = await auth(req)
            const uploadedFile = req.file
            const { company,  signedAt,  expiresAt } = req.body 
                      
            contract_validateFields(req)
            await contract_validateExistingCP(company)
    
    
            await con('promo_prime_contract').insert({
                id: new Authentication().generateId(),
                company,
                signedAt,
                expiresAt,
                contractName: uploadedFile?.filename,
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
            const statusCode = e.statusCocde || 400
            const message = e.error === undefined ? e.message : e.error.message 
            res.status(statusCode).send(message || e.sqlMessage)
        }
    }


    public async editContracts(req:Request, res:Response):Promise<void>{
        try{

            interface UploadedFile {
                fieldname: string;
                originalname: string;
                encoding: string;
                mimetype: string;
                size: number;
                buffer: Buffer;
            }
        
            const user = await auth(req)    
            const uploadedFile:UploadedFile | any = req.file    
            const { company, signedAt, expiresAt, contractName, contractUpdates } = req.body   
            
            editContractsValidateFields(req)           
            
            var updateFields:string[] = []
            
            editContractsValidateEdition(
                req,
                company,
                signedAt,
                expiresAt,
                uploadedFile,
                contractUpdates,
                updateFields
            )
    
    
            await con('promo_prime_contract').update({
                company,
                signedAt,
                expiresAt,
                contractName
            }).where({
                id: req.params.id
            })
            
            let messageToSend = 'Atualização de contrato realizada com sucesso'
            
            if(updateFields.length > 0){
                await con('promo_prime_tasks').insert({
                    id: new Authentication().generateId(),
                    user: user.name,
                    email: user.email,
                    moment: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
                    task: updateFields.join('.\n')
                })
            }else{
                messageToSend = 'Nenhuma alteração efetuada'
            }
    
            res.status(200).send(messageToSend)
        }catch(e:any){
            const statusCode = e.statusCocde
            const message = e.error.message
            res.status(statusCode).send(message || e.sqlMessage)
        }
    }
        

}

module.exports = new ContractController()