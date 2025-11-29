import {Route, Routes } from "react-router-dom"
import HomePage from "../pages/Home"
import TestPage from "../pages/TestPage"

function AppRouters(){
    return(       
        <Routes>
            <Route path="/" element = {<HomePage/>}/>
            <Route path="/teste" element = {<TestPage/>}/>
        </Routes>
    )
}

export default AppRouters;