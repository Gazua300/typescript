import { useEffect, useState, useContext } from "react"
import Context from '../../global/Context'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { BASE_URL } from "../../constants/urls"
import { Job } from "../../global/Context"
import { convertPhone } from '../../utils/convertPhone'
import DefaultHeader from "../../components/Header"
import { IoAddCircleOutline } from 'react-icons/io5'
import { BsFillPersonFill } from 'react-icons/bs'
import { 
    InputContainer,
    Cartao,
    Nome,
    Container,
    CartaoContainer,
 } from "./styled"


const List = ():JSX.Element=>{
    const navigate = useNavigate()
    const { states, setters, requests} = useContext(Context)
    const services = states.services
    const [title, setTitle] = useState<string>('')

    
    useEffect(()=>{
        if(!localStorage.getItem('id')){
            navigate('/')
        }
        requests.getAllJobs()
        
        document.title = 'Lista de Serviços'
    }, [])


    const handleTitle = (e:React.ChangeEvent<HTMLInputElement>):void=>{
        setTitle(e.target.value)
    }


    const getJobById = (job:any):void=>{
        axios.get(`${BASE_URL}/job/${job.id}`, {
            headers: {
                Authorization: localStorage.getItem('id')
            }
        }).then(res=>{
          setters.setJob(res.data)
          navigate('/detail')
        }).catch(e=>{
          alert(e.response.data)
        })
    }   


    const filtro = services && services.filter((item:Job)=>{
        return item.title.toLowerCase().includes(title.toLocaleLowerCase())
    })


    return(
        <>
        <DefaultHeader
            leftIcon={<IoAddCircleOutline className='icon' onClick={()=> navigate('/regist')}/>}
            title="Lista de Serviços"
            rightIcon={<BsFillPersonFill className='icon' onClick={()=> navigate('/profile')}/>}
            />
        <Container>
            <InputContainer>
                <input type='text' onChange={handleTitle} value={title} 
                    placeholder='Titulo do serviço                  🔎'/>                 
            </InputContainer>
            <CartaoContainer>
            {filtro && filtro.map((servico:Job)=>{
                return(
                    <Cartao key={servico.id}>
                        <Nome>{servico.title}</Nome>
                        <div className="card-content">
                            <b>Descrição: </b>{servico.description}<br/><br/>
                            <b>Contato: </b>{convertPhone(String(servico.phone))}<br/><br/>
                            <b>Horário de atendimento: </b>{servico.period}
                        </div>
                        <button className="btn btn-primary"
                            onClick={()=> getJobById(servico)}>
                            Entrar em contato
                        </button>
                    </Cartao>
                )
            })}
            </CartaoContainer>  
        </Container>  
        </>      
    )
}

export default List