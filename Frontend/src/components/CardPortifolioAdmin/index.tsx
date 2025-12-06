import React from "react";
import fotoCard from "../../assets/diretoriaProjeto.jpg"
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import Button from "../Button";
import "./Style.css"


interface mainCardProtifolio{
    title: string,
    description: string,
}


function CardPortifolioAdmin({title, description}: mainCardProtifolio){
    return(
        <div className="cardPortifolios">
            <div className="imagemPortifolio">
                <img src={fotoCard} alt="Análise de Dados"/>
            </div>
            <div className="containerTextPortifolio">
                <h1>
                    {title}
                </h1>
                <p>
                    {description}
                </p>
            </div>
            <div className="buttonContainerPortifolio">
                <Button
                    text="Editar"
                    icon={FaRegEdit}
                    color="#0051FF"
                    colorIcon="#FFF"
                />
                <Button
                    text="Excluir" 
                    icon={FaRegTrashAlt}
                    color="#FF0000"
                    colorIcon="#FFF"
                />
            </div>
        </div>
    )
}

export default CardPortifolioAdmin;