import "./Style.css"
import Button from "../Button";

interface mainCardService{
    title: string,
    description: string,
    image: string
}


function CardServic({title, description, image}: mainCardService) {
  return (
    <div className="boxCardConteudo">
        <div className="boxImagem">
            <img src={image} alt={title}/>
        </div>

        <div className="boxText">
            <div>
                <h1>{title}</h1>
                <p>
                    {description}
                </p>
            </div>
        </div>

        <div className="boxButtonCard">
            <Button
                text="Saiba Mais"
                color="#FFFF"
                href="#"
                textColor="#13317C"
            />
        </div>
    </div>
  );
}

export default CardServic;