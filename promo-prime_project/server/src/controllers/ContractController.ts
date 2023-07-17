import { Request, Response } from "express"
import { contract_validateExistingCP, contract_validateFields } from "../business/contractValidation"
const con = require('../connections/connection')
const { auth } = require('../services/auth')



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
            const { company,  signedAt,  expiresAt,  contractName} = req.body 
            console.log('Corpo', req.body)
            console.log('Arquivo', req.file)          
            contract_validateFields(req)
            await contract_validateExistingCP(company)
    
    
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
            const statusCode = e.statusCocde || 400
            const message = e.error.message
            res.status(statusCode).send(message || e.sqlMessage)
        }
    }


    public async editContracts(req:Request, res:Response):Promise<void>{
        try{
        
            const user = await auth(req)    
            const uploadedFile = req.file    
            const { company, signedAt, expiresAt, contractName, contractUpdates } = req.body
    
            
            
            
            const [contract] = await con('promo_prime_contract').where({
                id: req.params.id
            })
            
            var updateFields = []
    
           
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
                    statusCode = 403
                    throw new Error('Especifique as mudanças do contrato')
                }else{
                    updateFields.push(contractUpdates)
                }
            }        
    
    
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
        }catch(e){
            res.status(statusCode).send(e.message || e.sqlMessage)
        }
    }
        

}

module.exports = new ContractController()