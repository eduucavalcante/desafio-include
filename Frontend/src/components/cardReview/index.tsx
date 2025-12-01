import { Rating, RatingStar } from "flowbite-react"
import "./Style.css"

interface mainCardReview{
    notaStar: number; 
    maxnotaStar?: number; 
    description: string,
    imagem: string,
    nameUser: string,
    funcaoUser: string
}

function CardReview({funcaoUser, nameUser ,imagem, description, notaStar, maxnotaStar = 5} : mainCardReview){

    const stars = Array.from({ length: maxnotaStar }, (_, index) => (
        <RatingStar 
            key={index} 
            filled={index < Math.floor(notaStar)} 
            className="custom-star"
        />
    ));

    const hasHalfStar = notaStar % 1 !== 0;
    const fullStars = Math.floor(notaStar);
    
    return(
        <div className="containerCardReview">

            <div className="containerFotoUser">
                <img src={imagem} alt="Foto do usuário"/>
            </div> 

            <div className="containerInformacoes">

                <div className="rating-wrapper">
                    <Rating className="containerStarts" size="md">
                        {stars}
                        {hasHalfStar && fullStars < maxnotaStar && (
                            <div className="relative half-star-container">
                                <RatingStar filled={false} className="star" />
                                <div 
                                    className="absolute top-0 left-0 overflow-hidden" 
                                    style={{ width: '50%' }}
                                >
                                    <RatingStar filled={true} className="custom-star" />
                                </div>
                            </div>
                        )}
                    </Rating>
                </div>

                <div className="containerTexto">

                    <div className="containerReviewUser">
                        <p>
                           {description}
                        </p>
                    </div>

                    <div className="containerUserInfo">
                        <h1>
                            {nameUser}
                        </h1>
                        <p>
                            {funcaoUser}
                        </p>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default CardReview;  