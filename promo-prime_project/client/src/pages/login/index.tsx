import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { url } from '../../constants/urls'
import Header from '../../components/Header'
import { FaUserPlus } from 'react-icons/fa'
import { Container } from './styled.js'



interface Form{
    email:string
    password:string
}



const Login = ():JSX.Element=>{
    const navigate = useNavigate()
    const [form, setForm] = useState<Form>({
        email:'promo_prime@email.com',
        password:'123456'
    })


    useEffect(()=>{
        document.title = 'Promo Prime - Login'
    }, [])

    useEffect(()=>{
        const token = localStorage.getItem('token')

        if(token){
            navigate('/contracts')
        }
    }, [])


    const onChange = (e:React.ChangeEvent<HTMLInputElement>):void=>{
        const { name, value } = e.target
        setForm({... form, [name]:value})
    }


    const login = (e:React.ChangeEvent<HTMLFormElement>):void=>{
        e.preventDefault()

        const body = {
            email: form.email,
            password: form.password
        }

        axios.post(`${url}/login`, body).then(res=>{
            localStorage.setItem('token', JSON.stringify(res.data))
            navigate('/contracts')
        }).catch(e=>{
            alert(e.response.data)
        })
    }
    

    const limpar = ()=>{
        setForm({
            email:'',
            password:''
        })
    }



    return(
        <Container>
            <Header leftItem={<div></div>} 
                rightItem={<FaUserPlus onClick={()=> navigate('/signup')}
                    className='rightIcon'/>}/>
            <form onSubmit={login}>
                <fieldset>
                    <legend>Acesso</legend>
                    {/* <label htmlFor="email">Eamil: </label> */}
                    <input type="email" name='email' value={form.email} id='email'
                        onChange={onChange} placeholder='nome@email.com' required/>
                    {/* <label htmlFor="password">Senha: </label> */}
                    <input type="password" name='password' value={form.password} id='password'
                        onChange={onChange} placeholder='Sua senha' required/>
                    <div>
                        <input type='button' value='Limpar' onClick={limpar}/>
                        <button type="submit">Entrar</button>
                    </div>
                </fieldset>
            </form>
        </Container>
    )
}

export default Login
