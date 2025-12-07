import {Route, Routes } from "react-router-dom"
import HomePage from "../pages/Home"
import TestPage from "../pages/TestPage"
import Contatos from "../pages/Contatos"
import QuemSomos from "../pages/QuemSomos"
import HomeAdmin from "../pages/HomeAdmin"
import PortifolioAdmin from "../pages/PortifolioAdmin"
import NossoTimeAdmin from "../pages/NossoTimeAdmin"
import ContatosInstituAdmin from "../pages/ContatosInstitucionaisAdmin"
import ConteuInstitucionalPage from "../pages/ConteuInsitucional"
import PortifolioHome from "../pages/Portifolio"

function AppRouters(){
    return(       
        <Routes>
            <Route path="/" element = {<HomePage/>}/>
            <Route path="/teste" element = {<TestPage/>}/>
            <Route path="/contatos" element = {<Contatos/>}/>
            <Route path="/QuemSomos" element={<QuemSomos/>}/>
            <Route path="/HomeAdmin" element={<HomeAdmin/>}/>
            <Route path="/PortifolioAdmin" element={<PortifolioAdmin/>}/>
            <Route path="/NossoTimeAdmin" element={<NossoTimeAdmin/>}/>
            <Route path="/ContatosAdmin" element={<ContatosInstituAdmin/>}/>
            <Route path="/ConteudoInstitucional" element={<ConteuInstitucionalPage/>}/>
            <Route path="/PortifolioHome" element={<PortifolioHome/>}/>
        </Routes>
    )
}

export default AppRouters;