import NavBar from "../../components/NavBar";
import Button from "../../components/Button";
import { FaWhatsapp } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { FaRegQuestionCircle } from "react-icons/fa";
import logo from "../../assets/Logo.png"
import comCidades from "../../assets/comCidades.png"
import anosNoMercado from "../../assets/anos-no-mercado.png"
import qauntProject from "../../assets/quantidade-projetos.png"

import "./style.css"

function HomePage(){
    const impactos = [
        { id: 1, img: anosNoMercado },
        { id: 2, img: qauntProject },
        { id: 3, img: comCidades },
        { id: 4, img: comCidades }
    ];

    const impactosCarrossel = [...impactos, ...impactos];

    return(
        <div className="home-container">
            <NavBar/>

            <div className="boxApresentacao">
                <div className="boxTextElogoApresetacao">
                    <div className="boxTextApresetacao">
                        <div className="textApresetacao">
                            <h1>
                                Empresa Júnior de <br/> Engenharia Civil
                            </h1>
                            <p>
                                Projetando sonhos com essência e <br/>acessibilidade
                            </p>
                        </div>
                        <div className="buttonApresetacao">
                            <Button
                                text="Saiba mais"
                                color="#CEDFE0"
                                href="#"
                                icon={FaWhatsapp}
                                textColor="black"
                            />
                            <Button
                                text="Faça seu Orçamento"
                                color="#DA5126"
                                href="#"
                                textColor="white"
                            />
                        </div>
                    </div>
                    <div className="boxLogoApresentacao">
                        <div className="logoApresetacao">
                            <img src={logo} alt="Logo Vale J" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-impacto"> 
                <div className="carrossel-wrapper">
                    {impactos.map((impacto, index) => (
                        <div key={impacto.id} className="impacto-item">
                            <img src={impacto.img} alt={`Impacto ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomePage;