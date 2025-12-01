import "./Style.css"
import type { IconType } from "react-icons"

interface MainButton{
    text: string,
    color: string,
    icon?: IconType,
    href: string
    textColor?: string 

}

function Button({text, color, href, icon: Icon, textColor} : MainButton){
    return(
        <a href={href}>
            <div className="buttonBox" style={{backgroundColor: color}}>
                {Icon && <Icon size={20} style={{ marginRight: "8px", color: "black" }} />}
                <span className="buttonText" style={{color: textColor}}>
                    {text}
                </span>
            </div>
        </a>
    )
}
export default Button;