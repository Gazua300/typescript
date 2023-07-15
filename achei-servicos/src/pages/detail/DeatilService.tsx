import { useContext, useEffect } from 'react'
import Context from '../../global/Context'
import { useNavigate } from 'react-router-dom'
import DefaultHeader from '../../components/Header'
import { IoAddCircleOutline } from 'react-icons/io5'
import { IoIosArrowBack, IoLogoWhatsapp } from 'react-icons/io'
import { convertPhone } from '../../utils/convertPhone'
import { 
    Container,
    Cartao,
    Nome,
 } from './styled'


const DetailService = ():JSX.Element=>{
    const navigate = useNavigate()
    const { states } = useContext(Context)
    const servico = states.job
    const message = `Olá, vi seu serviço anunciado no aplicativo Loja de Serviços e gostaria de contratá-lo`


    useEffect(()=>{
        if(!localStorage.getItem('id')){
            navigate('/')
        }
    }, [])

    return(
        <>
        <DefaultHeader
            leftIcon={<IoIosArrowBack onClick={()=> navigate(-1)} className='icon'/>}
            title={servico.title}
            rightIcon={<IoAddCircleOutline onClick={()=> navigate('/regist')} className='icon'/>}
        />
        <Container>
            <Cartao>
                <Nome>{servico.title}</Nome>
                <div className="card-content">
                    <b>Descrição: </b>{servico.description}<br/><br/>
                    <b>Contato: </b>{convertPhone(servico.phone)}<br/><br/>
                    <b>Horário de atendimento: </b>{servico.period}
                </div>
                <a href={`https://api.whatsapp.com/send?phone=55${servico.phone}&text=${message}`} target='_blank'>
                    <IoLogoWhatsapp style={{
                        color:'#25D366',
                        cursor:'pointer',
                        fontSize:'2rem',
                    }}/>
                </a>
            </Cartao><br/>
        </Container>
        </>
    )
}

export default DetailService