import NavBar from "../../components/NavBar";
import Button from "../../components/Button";
import { Carousel } from 'primereact/carousel';
import CardProject from "../../components/CardProjetos";
import CardServic from "../../components/CardServic";
import CardReview from "../../components/CardReview";
import CardEquipe from "../../components/CardEquipe";
import ModalEquipe from "../../components/ModalEquipe";
import FooterUser from "../../components/Footer";
import type { Diretoria } from "../../utils/DiretoriaType";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import logo from "../../assets/Logo.png"
import dados from "./dates";
import "./style.css"

function HomePage(){

    const [openModal, setOpenModal] = useState(false);
    const [diretoriaSelecionada, setDiretoriaSelecionada] = useState<Diretoria | null>(null);

    const handleOpen = (item: Diretoria) => {
        setDiretoriaSelecionada(item);
        setOpenModal(true);
    };

    const { responsiveOptions, impactos, projetos, servicos, responsiveOptionsReview, reviewClientes, dadosDiretoria} = dados;

    const CardProjectTemplate = (project: any) => {
        return <CardProject {...project} />;
    };

    const CardServicTemplate = (service: any) => {
        return <CardServic {...service} />;
    };

    const CardReviewTemplate = (service: any) => {
        return <CardReview {...service} />;
    }
    
    
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
            
            <div className="containerProjetos">
                <div className="conteudoProjetos">
                    <div className="titleProjetos">
                        <h1 className="barra-laranja">Projetos</h1>
                    </div>
                    <div className="card">
                        <Carousel 
                            value={projetos} 
                            numVisible={4} 
                            numScroll={1} 
                            className="custom-carousel" 
                            circular
                            responsiveOptions={responsiveOptions}
                            autoplayInterval={3000}
                            itemTemplate={CardProjectTemplate}
                            showNavigators={false}
                            showIndicators={false}
                        />
                    </div>
                </div>
            </div>

            <div className="containerService">
                <div className="conteudoServices">
                    <div className="titleService">
                        <h1 className="barraAzul">Nossos Serviços</h1>
                    </div>
                    <div className="cardService">
                        <Carousel
                            value={servicos}
                            numVisible={4} 
                            numScroll={1} 
                            className="custom-carousel-service"
                            circular
                            responsiveOptions={responsiveOptions}
                            itemTemplate={CardServicTemplate}
                            showNavigators={true}
                            showIndicators={true} 
                        />
                    </div>
                </div>
            </div>

            <div className="containerReviews">
                <div className="conteudoReviews">
                    <div className="titleReviews">
                        <h1 className="barra-laranja">O que nossos clientes dizem</h1>
                        <p className="subTextReview">
                            A satisfação de quem confia em nosso trabalho é nossa maior conquista.
                        </p>
                    </div>
                    <div className="cardReview">
                        <Carousel
                            value={reviewClientes}
                            numVisible={1} 
                            numScroll={1}   
                            className="custom-carousel-review"
                            circular
                            autoplayInterval={3000}
                            responsiveOptions={responsiveOptionsReview}
                            itemTemplate={CardReviewTemplate}
                            showNavigators={true}
                            showIndicators={true}
                        />
                    </div>
                </div>
            </div>

            <div className="containeDiretorias"> 
                <div className="containerEquipes">
                    <h1 className="barraAzul">Conheça Nossa Equipe</h1>
                </div>
                <div className="carrossel-wrapper">
                    {dadosDiretoria.map((diretoria) => (
                        <CardEquipe
                            key={diretoria.id}
                            title={diretoria.title}
                            onClick={() => handleOpen(diretoria)}  
                        />
                    ))}
                </div>
            </div>
            
            <FooterUser/>

            <ModalEquipe
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                dados={diretoriaSelecionada}
            />

        </div>
    )
}

export default HomePage;