import {Route, Routes } from "react-router-dom"
import HomePage from "../pages/Home"
import TestPage from "../pages/TestPage"
import Contatos from "../pages/Contatos"

function AppRouters(){
    return(       
        <Routes>
            <Route path="/" element = {<HomePage/>}/>
            <Route path="/teste" element = {<TestPage/>}/>
            <Route path="/contatos" element = {<Contatos/>}/>
        </Routes>
    )
}

export default AppRouters;