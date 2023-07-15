import React, { createContext, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../constants/urls'


const Context = createContext<any>(null)


export interface Job{
    id:string
    title:string
    description:string
    phone:number
    period:string
    provider:string
}

interface GlobalStateProps{
    children:React.ReactNode
}



export const GlobalState:React.FC<GlobalStateProps> = (props)=>{
    const [services, setServices] = useState<Job[]>([])
    const [job, setJob] = useState<Job>()
    


    const getAllJobs = ()=>{
        axios.get(`${BASE_URL}/jobs`, {
            headers: {
                Authorization: localStorage.getItem('id')
            }
        }).then(res=>{
            setServices(res.data)
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    const states = { services, job }
    const setters = { setJob }
    const requests = { getAllJobs }


    return(
        <Context.Provider value={{ states, setters, requests }}>
            { props.children }
        </Context.Provider>
    )
}

export default Context