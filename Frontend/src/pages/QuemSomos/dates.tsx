import logoUser from "../../assets/pessoa.jpg"
import comCidades from "../../assets/comCidades.png";
import anosNoMercado from "../../assets/anos-no-mercado.png";
import qauntProject from "../../assets/quantidade-projetos.png";
import imagemFundo from "../../assets/ImagemFundo.png";
import fotoUser from "../../assets/pessoa.jpg"
import premio1 from "../../assets/premio1.jpg"
import premio2 from "../../assets/premio2.jpg"
import premio3 from "../../assets/premio3.jpg"
import premio4 from "../../assets/premio4.jpg"

export default{
    impactos: [
        { id: 1, img: anosNoMercado },
        { id: 2, img: qauntProject },
        { id: 3, img: comCidades },
        { id: 4, img: comCidades }
    ],

    fotosPremios:[
        {id:1, image: premio1},
        {id:2, image: premio2},
        {id:3, image: premio3},
        {id:4, image: premio4},
    ],
    eventos:[
        {id:1, title: "Algum titulos ai ", description:"olas kjskajskajs asiobikbalsikubQLIKBBLIB ijsdijwijdwijdlw kdnwidwiojdwindwkbdwlidb", image: premio1},
        {id:2, title: "Algum titulos ai ", description:"olas kjskajskajs asiobikbalsikubQLIKBBLIB ijsdijwijdwijdlw kdnwidwiojdwindwkbdwlidb", image: premio2},
        {id:3, title: "Algum titulos ai ", description:"olas kjskajskajs asiobikbalsikubQLIKBBLIB ijsdijwijdwijdlw kdnwidwiojdwindwkbdwlidb", image: premio1},
        {id:4, title: "Algum titulos ai ", description:"olas kjskajskajs asiobikbalsikubQLIKBBLIB ijsdijwijdwijdlw kdnwidwiojdwindwkbdwlidb", image: premio4},
        {id:5, title: "Algum titulos ai ", description:"olas kjskajskajs asiobikbalsikubQLIKBBLIB ijsdijwijdwijdlw kdnwidwiojdwindwkbdwlidb", image: premio3},
    ],

    cardValor:[
        {
            id: 1,
            title: "Algum título importante de um valor 1",
            description: "Descrição do suporte descrição do suporte descrição do suporte descrição do suporte descrição do suporte descrição do suporte",
            img: logoUser
        },
        {
            id: 2,
            title: "Algum título importante de um valor 2",
            description: "Descrição do suporte descrição do suporte descrição do suporte descrição do suporte descrição do suporte descrição do suporte",
            img: logoUser
        },
        {
            id: 3,
            title: "Algum título importante de um valor 3",
            description: "Descrição do suporte descrição do suporte descrição do suporte descrição do suporte descrição do suporte descrição do suporte",
            img: logoUser
        },
        {
            id: 4,
            title: "Algum título importante de um valor 4",
            description: "Descrição do suporte descrição do suporte descrição do suporte descrição do suporte descrição do suporte descrição do suporte",
            img: logoUser
        },
        {
            id: 5,
            title: "Algum título importante de um valor 5",
            description: "Descrição do suporte descrição do suporte descrição do suporte descrição do suporte descrição do suporte descrição do suporte",
            img: logoUser
        },
    ],
    responsiveOptions: [
        {
            breakpoint: '1400px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
        }
    ],
}