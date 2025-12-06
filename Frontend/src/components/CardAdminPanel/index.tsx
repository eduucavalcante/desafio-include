import type { IconType } from "react-icons"
import "./Style.css"

interface mainCardAdmin{
    title: string,
    description: string,
    icon: IconType,
    color: string,
    cardColor: string
}

function CardAdminPanel({title, description, icon: Icon, color, cardColor}: mainCardAdmin){
    return(
        <a href="#" className="card-admin-link">
            <div className="containerCardAdmin">
                <div className="containerTitleCardAdmin">
                    <div className="containerIcon" style={{background: cardColor}}>
                        {Icon && <Icon size={25} color={color}/>}
                    </div>
                    <div className="titleCardAdmin">
                        <h1>
                            {title}
                        </h1>
                    </div>
                </div>
                <div className="containerDescricao">
                    <p>
                        {description}
                    </p>
                </div>      
            </div>
        </a>
    )
}

export default CardAdminPanel;