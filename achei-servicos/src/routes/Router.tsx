import { Routes, Route } from "react-router-dom"
import Login from "../pages/login"
import List from "../pages/list"
import RegistServices from "../pages/register"
import Profile from "../pages/profile"
import DetailService from "../pages/detail/DeatilService"


const Router:React.FC = ()=>{
    return(
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/list' element={<List/>}/>
            <Route path='/regist' element={<RegistServices/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/detail' element={<DetailService/>}/>
        </Routes>
    )
}

export default Router