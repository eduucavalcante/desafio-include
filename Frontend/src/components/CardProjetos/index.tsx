import "./Style.css"

interface mainCardProjec{
    title: string,
    description: string,
    imagem: string
}


function CardProject({title, description, imagem}:mainCardProjec){
    return (
        <div className="boxContainerServic">
            <div className="boxServicImg">
                <img src={imagem}/>
            </div>
            <div className="boxServiceText">
                <h1>
                    {title}
                </h1>
                <p>
                    {description}
                </p>
            </div>
        </div>
    )
}

export default CardProject;

