import "./Style.css"
import fotouser from "../../assets/pessoa.jpg"

interface MainCardValor{
    title: string,
    description: string,
    img: string
}

function CardValorUser({title, description, img}: MainCardValor){
    return(
        <div className="containerCardValor">

            <div className="containerImgValor">
                <img src={img} alt="user" />
            </div>

            <h1 className="tituloValor">
                {title}
            </h1>

            <p className="descricaoValor">
                {description}
            </p>

        </div>
    )
}

export default CardValorUser
