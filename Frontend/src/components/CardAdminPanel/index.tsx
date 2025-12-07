import type { IconType } from "react-icons"
import "./Style.css"
import { useNavigate } from "react-router-dom"

interface mainCardAdmin{
    title: string,
    description: string,
    icon: IconType,
    color: string,
    cardColor: string,
    route: string
}

function CardAdminPanel({title, description, icon: Icon, color, cardColor, route}: mainCardAdmin){

    const navigation = useNavigate();

    const handleClick = () => {
        navigation(route);
    };
    return(
        <div className="card-admin-link" onClick={handleClick} style={{ cursor: 'pointer' }}>
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
        </div>
    )
}

export default CardAdminPanel;