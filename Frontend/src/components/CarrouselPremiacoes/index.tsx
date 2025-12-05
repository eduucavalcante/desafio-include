import { Carousel } from "primereact/carousel";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Style.css";

interface FotoPremiacao {
    image: string;
}

function CarrosselPremiacoes({ fotosPremios }: { fotosPremios: FotoPremiacao[] }) {

    const itemTemplate = (item: FotoPremiacao) => {
        return (
            <div className="cardCarrossel">
                <img src={item.image} alt="premiação" className="imgCarrossel" />
            </div>
        );
    };

    return (
        <div className="containerPremiacao">
            <h1 className="barra-laranja tituloPremiacao">Premiações</h1>

            <Carousel
                value={fotosPremios}
                numVisible={1}
                numScroll={1}
                autoplayInterval={4000}
                circular
                itemTemplate={itemTemplate}
                showNavigators={false}
                showIndicators={false}
                className="customCarousel"
            />
        </div>
    );
}

export default CarrosselPremiacoes;
