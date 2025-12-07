import React, { useState } from 'react';
import logoFooter from "../../assets/logoFooter.png";
import { IoTimeOutline } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MoldaLogin from '../ModelLogin';
import "./Style.css"

function FooterUser() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const openAdminModal = () => setIsModalOpen(true);
    const closeAdminModal = () => setIsModalOpen(false);

    const handleLoginSuccess = () => {
        closeAdminModal(); 
        navigate("/HomeAdmin"); 
    };

    return (
        <>
            <footer className="footerContainer">
                <div className="footerColumn leftCol">

                    <div className="leftRow">
                        <div className="leftItem">
                            <h3>Redes Sociais:</h3>
                            <div className="iconRow">
                                <FaInstagram size={20} />
                                <p>@valej.jr</p>
                            </div>
                            <div className="iconRow">
                                <FaInstagram size={20} />
                                <p>ValeJunior</p>
                            </div>
                        </div>

                        <div className="leftItem">
                            <h3>Localização:</h3>
                            <div className="iconRow">
                                <MdLocationOn size={20} />
                                <p>
                                    Av. Cel. Araújo Lima, 1358 <br />
                                    Centro, Russas-CE
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="leftRow">
                        <div className="leftItem">
                            <h3>Atendimento:</h3>
                            <p>(88) 9 9653-9313</p>
                            <p>valej@contato.com</p>
                        </div>

                        <div className="leftItem">
                            <h3>Horários:</h3>
                            <div className="iconRow">
                                <IoTimeOutline size={20} />
                                <p>
                                    Segunda a Sexta <br />
                                    08h às 12h <br />
                                    13h às 17h
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="footerColumn centerCol">
                    <img src={logoFooter} alt="Logo Vale J" className="footerLogo" />
                    <p className="copyText">
                        Copyright ©2025 Todos os direitos reservados | Site criado por
                        IncludeJr – Empresa Jr.
                    </p>
                </div>

                <div className="footerColumn rightCol">
                    <nav className="footerNav">
                        <a href="#">Início</a>
                        <a href="#">Serviços</a>
                        <a href="#">Quem Somos</a>
                        <a href="#">Portfólio</a>
                        <a href="#">Contato</a>
                        
                        <a onClick={openAdminModal}>Painel Administrativo</a>
                    </nav>
                </div>

            </footer>
            
            <MoldaLogin 
                show={isModalOpen} 
                onClose={closeAdminModal}
                onLoginSuccess={handleLoginSuccess}
            />
        </>
    );
}

export default FooterUser;