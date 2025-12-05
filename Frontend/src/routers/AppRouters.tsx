import {Route, Routes } from "react-router-dom"
import HomePage from "../pages/Home"
import TestPage from "../pages/TestPage"
import Contatos from "../pages/Contatos"
import QuemSomos from "../pages/QuemSomos"

function AppRouters(){
    return(       
        <Routes>
            <Route path="/" element = {<HomePage/>}/>
            <Route path="/teste" element = {<TestPage/>}/>
            <Route path="/contatos" element = {<Contatos/>}/>
            <Route path="/QuemSomos" element={<QuemSomos/>}/>
        </Routes>
    )
}

export default AppRouters;