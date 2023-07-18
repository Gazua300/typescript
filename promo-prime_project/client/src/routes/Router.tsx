import { Routes, Route } from 'react-router-dom'
import Login from '../pages/login'
import Signup from '../pages/signup'


const Router = ():JSX.Element=>{
    return(
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
        </Routes>
    )
}

export default Router