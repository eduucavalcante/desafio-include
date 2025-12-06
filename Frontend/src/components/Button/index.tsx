import "./Style.css"
import type { IconType } from "react-icons"

interface MainButton{
    text: string,
    color: string,
    icon?: IconType,
    href?: string
    textColor?: string,
    colorIcon?: string,
    onClick?: React.MouseEventHandler<HTMLDivElement>
}

function Button( {text, color, href, icon: Icon, textColor, onClick, colorIcon}: MainButton){
    return(
        <a href={href}>
            <div className="buttonBox" style={{backgroundColor: color}} onClick={onClick}>

                {Icon && <Icon size={20} style={{ marginRight: "8px", color: colorIcon || "black" }} />}

                <span className="buttonText" style={{color: textColor}}>
                    {text}
                </span>
            </div>
        </a>
    )
}
export default Button;






