import { useContext, useEffect, useState } from 'react'
import Context from '../../global/Context'
import axios from 'axios'
import { BASE_URL } from "../../constants/urls"
import { useNavigate } from 'react-router-dom'
import DefaultHeader from '../../components/Header'
import { AiOutlineLogout } from 'react-icons/ai'
import { BsCardList } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'
import { Job } from '../../global/Context'
import { 
    Container,
    Cartao,
    Search
 } from './styled'


 interface User{
    id:string
    name:string
    email:string
    password:string
    push_token:string
    subscription:string
}



const Profile = ()=>{
    const navigate = useNavigate()
    const { setters } = useContext(Context)
    const [servicos, setServicos] = useState<Job[]>([])
    const [titulo, setTitulo] = useState<string>('')
    const [user, setUser] = useState<User>({
        id:'',
        name:'',
        email:'',
        password:'',
        push_token:'',
        subscription:''
    })
    

    useEffect(()=>{
        if(!localStorage.getItem('id')){
            navigate('/')
        }

        userJobs()
        getProfile()
        document.title = 'Perfil do Usuário'
    }, [])


    const getProfile = ()=>{
        axios.get(`${BASE_URL}/user`, {
            headers: {
                Authorization: localStorage.getItem('id')
            }
        }).then(res=>{
            setUser(res.data)
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    const userJobs = ()=>{
        axios.get(`${BASE_URL}/userjobs`, {
            headers: {
                Authorization: localStorage.getItem('id')
            }
        }).then(res=>{
            setServicos(res.data)
        }).catch(e=>{
            alert(e)
        })
    }


    const comMouse = (id:string)=>{
        (document.getElementById(id) as HTMLElement).style.color = 'red'
    }

    const semMouse = (id:string)=>{
        (document.getElementById(id) as HTMLElement).style.color = 'whitesmoke'
    }


    const deleteServico = (servico:Job)=>{      
        const confirmar = window.confirm(`Tem certeza que deseja excluir ${servico.title}?`)

        if(confirmar){
            axios.delete(`${BASE_URL}/job/${servico.id}`, {
                headers: {
                    Authorization: localStorage.getItem('id')
                }
            }).then(()=>{
                userJobs()
            }).catch(e=>{
                alert(e.response.data)
            })
        }
    }


    const logout = ()=>{
        const confirmar = window.confirm('Deseja deslogar da sua conta?')

        if(confirmar){
            localStorage.clear()
            navigate('/')
        }
    }


    const filtro:Job[] = servicos && servicos.filter(item=>{
        return item.title.toLowerCase().includes(titulo.toLowerCase())
    })

    
    
    return(
        <>
        <DefaultHeader
            leftIcon={<BsCardList onClick={()=> navigate('/lista')} className='icon' />}
            title='Perfil'
            rightIcon={<AiOutlineLogout onClick={logout} className='icon' />}
        />
        <Container>
           <div style={{textAlign:'start', marginLeft:20, marginTop:30}}>
                <b>Nome: </b>{user.name}<br/>
                <b>Email: </b>{user.email}
           </div>
           <div className='title'>
                Serviços cadastrados
           </div>           
           <div style={{border:'1px solid', margin:20}}/>
           <div style={{position:'relative'}}>
                <Search placeholder='Título do serviço                  🔎' 
                    className='input-search'
                    type='text'
                    value={titulo}
                    onChange={(e)=> setTitulo(e.target.value)}/>
           </div>
           <div style={{overflow:'auto'}} >
                {filtro.length > 0 ? (
                    filtro.map(servico=>{
                        return(
                            <Cartao key={servico.id}>
                                <div onClick={()=>{
                                    setters.setJob(servico)
                                    navigate('/detail')
                                }} 
                                    style={{cursor:'pointer'}}>
                                    {servico.title}
                                </div>
                                <MdDelete style={{fontSize:20, cursor:'pointer', color:'whitesmoke'}}
                                    id={servico.id}
                                    onMouseOver={()=> comMouse(servico.id)}
                                    onMouseOut={()=> semMouse(servico.id )}
                                    onClick={()=> deleteServico(servico)} />
                            </Cartao>
                        )
                    })        
                ) : null}
            </div>
        </Container>
        </>
    )
}
export default Profile