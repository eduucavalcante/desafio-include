import "./style.css"
import PessoasValores from "../../assets/PessoasValores.png"

function TesteFront(){
    return (
        <div className="CardValores">
            <div>
                <div className="PessoasValores">
                    <img src={PessoasValores} />
                </div>
                <h1 className="TextoCard">
                    Algum título importante de um valor
                </h1>
                <p className="Texto2">
                    Descrição do suporte descrição do suporte descrição do suporte descrição do suporte descrição do suporte descrição do suporte
                </p>
            </div>
        </div>
    )
}

export default TesteFront;