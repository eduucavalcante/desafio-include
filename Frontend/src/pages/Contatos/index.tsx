    import Navbar from "../../components/NavBar";
    import FooterUser from "../../components/Footer";
    import FormComponent from "../../components/FormComponente";
    import { FaWhatsapp } from "react-icons/fa";
    import WhatsMenssager from "../../utils/whatsMenssager";
    import "./Style.css"

    function Contatos(){
        return(
            <div>
                <Navbar/>
                    <div className="containerContatos">

                        <div className = "containerTitleContatos">
                            <h1>
                                CONTATOS
                            </h1>
                            <p>
                                Preencha o formulário abaixo e nossa equipe entrará em contato para entender<br/>suas necessidades e elaborar um orçamento personalizado.
                            </p>
                        </div>

                        <div className="containerContatosFormulario">
                            <div>
                                <div className="containerInformacoes">
                                    <h1>
                                        Informações de Contato
                                    </h1>
                                    <div>
                                        <h1>
                                            WhatsApp:
                                        </h1>
                                        <p>
                                            (88) 9 9653-9313
                                        </p>
                                    </div>
                                    <div>
                                        <h1>
                                            E-mail:
                                        </h1>
                                        <p>
                                            valej@contato.com
                                        </p>
                                    </div>
                                    <div>
                                        <h1>
                                            Horário de atendimento:
                                        </h1>
                                        <p>
                                            Segunda a Sexta:<br/>08h às 12h<br/>13h às 17h
                                        </p>
                                    </div>
                                </div>

                                <div className="containerAtendimento">
                                        <h1>
                                            Atendimento personalizado
                                        </h1>
                                        <p>
                                            Antes de enviar o orçamento, agendamos uma conversa para entender todos os detalhes do seu projeto. Assim garantimos que a proposta será exatamente o que você precisa.
                                        </p>
                                        <a className="boxWhatss" href={WhatsMenssager({numberTelefone: "557488358666"})}>
                                            <FaWhatsapp size={25}/>
                                            <p>
                                                Falar agora no WhatsApp
                                            </p>
                                        </a>
                                </div>
                                
                            </div>
                            <FormComponent/>
                        </div>
                    </div>
                <FooterUser/>
                
            </div>
        )
    }

    export default Contatos;