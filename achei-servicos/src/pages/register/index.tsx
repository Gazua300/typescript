import { useState, useEffect, useContext } from 'react'
import Context from '../../global/Context'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../constants/urls'
import DefaultHeader from '../../components/Header'
import { BsCardList, BsFillPersonFill } from 'react-icons/bs'
import { Container, BtnContainer } from './styled'



interface Form{
    title:string
    description:string
    phone:string
    period:string
}

const RegistServices = ():JSX.Element=>{
    const navigate = useNavigate()
    const { requests } = useContext(Context)
    const [form, setForm] = useState<Form>({
        title:'',
        description:'',
        phone:'',
        period:''
    })



    useEffect(()=>{
        if(!localStorage.getItem('id')){
            navigate('/')
        }

        document.title = 'Cadastro de Serviços'
    }, [])


    const onChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>):void=>{
        const { name, value } = e.target
        setForm({...form, [name]:value})
    }


    const regist = (e:React.FormEvent<HTMLFormElement>):void=>{
        e.preventDefault()

        const body = {
            title: form.title,
            description: form.description,
            phone: form.phone,
            period: form.period
        }
        axios({
            method:'POST',
            url:`${BASE_URL}/jobs`,
            headers: {
                Authorization: localStorage.getItem('id')
            },
            data: body
        }).then(()=>{
            requests.getAllJobs()
            navigate('/')
            setForm({
                title:'',
                description:'',
                phone:'',
                period:''
            })
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    return(
        <>
        <DefaultHeader
            leftIcon={<BsCardList onClick={()=> navigate('/list')} className='icon'/>}
            title='Cadastrar Serviço'
            rightIcon={<BsFillPersonFill onClick={()=> navigate('/profile')} className='icon'/>}/>
        <Container>
            <form onSubmit={regist}>
                <fieldset>
                    <input type='text' name='titulo' value={form.title} onChange={onChange}
                        placeholder='Nome do serviço' required/>
                    <textarea name='desciption' value={form.description} onChange={onChange}
                        placeholder='Descricao' required/>
                    <input type='tel' name='phone' value={form.phone} onChange={onChange}
                        placeholder='DDD e telefone' required/>
                    <input type='text' name='period' value={form.period} onChange={onChange}
                        placeholder='Período de atendimento' required/>
                    <BtnContainer>
                        <button className='btn btn-primary'>Cadastrar</button>
                        <input type='button' className='btn btn-primary' onClick={()=> navigate('/')} value='Lista'/>
                    </BtnContainer>
                </fieldset>
            </form>
        </Container>
        </>
    )
}

export default RegistServices