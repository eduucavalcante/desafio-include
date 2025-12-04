import { href } from "react-router-dom";
import "./Style.css"

interface mainCardEquipe{
    title: string,
    href?: string
    onClick: () => void
}


function CardEquipe({title, href, onClick} :mainCardEquipe){
    return(
        <a className="containerDiretoria" href={href} onClick={onClick}>
            <div className="containerDiretoriaText">
                <h1>
                    {title}
                </h1>
            </div>
        </a>
    )
}

export default CardEquipe;