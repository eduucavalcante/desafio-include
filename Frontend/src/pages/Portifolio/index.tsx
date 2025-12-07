import Navbar from "../../components/NavBar";
import CardProject from "../../components/CardProjetos"; 
import { Carousel } from 'primereact/carousel'; 
import dados from "../Home/dates"; 
import "./Style.css"

function PortifolioHome(){
    
    const { projetos, responsiveOptions } = dados;

    const CardProjectTemplate = (project: any) => {
        return <CardProject {...project} />;
    };

    return(
        <div>
            <Navbar/>
            

            <div className="containerProjetosPortfolio">
                <div className="conteudoProjetos">
                    <div className="card">
                        <Carousel 
                            value={projetos} 
                            numVisible={4} 
                            numScroll={1} 
                            className="custom-carousel" 
                            circular
                            responsiveOptions={responsiveOptions}
                            autoplayInterval={3000}
                            itemTemplate={CardProjectTemplate}
                            showNavigators={false}
                            showIndicators={false}
                        />
                    </div>
                </div>
            </div>


        </div>
    )
}

export default PortifolioHome;