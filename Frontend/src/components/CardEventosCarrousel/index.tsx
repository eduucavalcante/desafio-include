// CardEventosCarrousel.jsx
import React from "react";
import fotoEvento from "../../assets/premio1.jpg";
import "./Style.css";

interface MainEventoCarrousel{
    title: string,
    description: string,
    image: string
}


function CardEventosCarrousel({title, description, image}: MainEventoCarrousel) {
    return (
        <div className="containerEventoContainer">
            <div className="containerTextEventos">
                <div className="containerTitleEventos">
                    <h1>{title}</h1>
                </div>
                <div className="containerDescriptionEventos">
                    <p>
                        {description}
                    </p>
                </div>
            </div>
            <div className="containerFotoEventos">
                <div>
                    <img src={image} alt="Evento em Fortaleza - Vale Jr" />
                </div>
            </div>
        </div>
    );
}

export default CardEventosCarrousel;