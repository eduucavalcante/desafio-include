import React from "react";
import Navbar from "../../components/NavBar";
import grupoImagem from "../../assets/groupImagem.png"
import CardValorUser from "../../components/CardValorUser";
import { Carousel } from 'primereact/carousel';
import dados from "./dates"
import FooterUser from "../../components/Footer";

import "./Style.css"
import CardEventosCarrousel from "../../components/CardEventosCarrousel";


interface FotoPremiacao {
    image: string;
}

function QuemSomos(){
    const { cardValor, responsiveOptions, impactos, fotosPremios, eventos } = dados;

    const CardValorUserModel = (project: any) => {
        return <CardValorUser {...project} />;
    };

    const CardEventosCarrouselModel = (project: any) =>{
        return <CardEventosCarrousel{...project}/>
    }

    const itemTemplate = (item: FotoPremiacao) => {
        return (
            <div className="cardCarrossel">
                <img src={item.image} alt="premiação" className="imgCarrossel" />
            </div>
        );
    };

    return(
        <div >
            <Navbar/>

            <div className="containerQuemSomos">
                <div className="containerImgQuemSomos">
                    <img src={grupoImagem}/>
                </div>
                <div className="containerTextQuemSomos">
                    <div className="conteudoTextQuemSomos">

                        <div className="containerTituloQuemSomos">
                            <h1 className="texteBarraLaranja">
                                Quem Somos?
                            </h1>
                        </div>

                        <div className="containerP1">
                            <p>
                                Lorem ipsum dolor sit amet consectetur. Placerat in posuere pellentesque auctor porttitor metus. Risus feugiat eu adipiscing dignissim enim. Cras mauris dictum arcu neque consequat odio.Lorem ipsum dolor sit amet consectetur. Placerat in posuere pellentesque auctor porttitor metus. Risus feugiat eu adipiscing dignissim enim. Cras mauris dictum arcu neque consequat odio.
                            </p>
                        </div>

                        <div className="containerP2">
                            <p>
                                Lorem ipsum dolor sit amet consectetur. Placerat in posuere pellentesque auctor porttitor metus. Risus feugiat eu adipiscing dignissim enim. Cras mauris dictum arcu neque consequat odio.
                            </p>
                        </div>

                        <div className="containerFraseIpactoQuemSomos">
                            <p>
                                Alguma coisa muito importante
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="containerNossosValores">
                <div>
                    <div className="containerTextNossosValores">
                        <h1 className="texteBarraAzul">
                            Nossos Valores
                        </h1>
                    </div>
                    <div>
                        <div className="card">
                            <Carousel 
                                value={cardValor} 
                                numVisible={3} 
                                numScroll={1} 
                                className="custom-carousel" 
                                circular
                                responsiveOptions={responsiveOptions}
                                autoplayInterval={3000}
                                itemTemplate={CardValorUserModel}
                                showNavigators={false}
                                showIndicators={false}
                            />
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

            <div className="containerPremiacao">
                    <div className="containerTitlePremiacao">
                        <h1 className="barra-laranja">
                            Premiações
                        </h1>
                    </div>
                    <div className="carroseulPremiacoes">
                            <Carousel
                                value={fotosPremios}
                                numVisible={1}
                                numScroll={1}
                                autoplayInterval={4000}
                                circular
                                itemTemplate={itemTemplate}
                                showNavigators={true}
                                showIndicators={true}
                                className="customCarousel"
                            />
                    </div>
            </div>

            <div className="containerEventosQuemSomos">

                <div className="containerTitleEventosQuemSomos">
                    <h1 className="texteBarraAzul">
                        Eventos
                    </h1>
                </div>

                <div className="carrouselEventos">
                    <Carousel
                        value={eventos}
                        numVisible={1}
                        numScroll={1}
                        autoplayInterval={4000}
                        circular
                        itemTemplate={CardEventosCarrouselModel}
                        showNavigators={true}
                        showIndicators={true}
                        className="customCarousel"
                    />
                </div>

            </div>

            <FooterUser/>
        </div>
    )
}

export default QuemSomos;