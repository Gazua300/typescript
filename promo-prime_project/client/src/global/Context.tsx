import { ReactNode, createContext, useState } from "react"


const Context = createContext<any>(null)


interface GlobalStateProps{
    children:React.ReactNode
}

interface Contract{
    id:string
    company:string,
    signedAt:Date
    expiresAt:Date
    contractName:string
    user_id:string
}


export const GlobalState:React.FC<GlobalStateProps> = (props)=>{
    const [contract, setContract] = useState<Contract>({
        id:'',
        company:'',
        signedAt: new Date(),
        expiresAt: new Date(),
        contractName:'',
        user_id:''
    })

    const states = { contract }
    const setters = { setContract }
    const requests = {}


    return(
        <Context.Provider value={{ states, setters, requests }}>
            {props.children}
        </Context.Provider>
    )
}