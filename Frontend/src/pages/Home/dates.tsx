// dados.js - CORRIGIDO
import comCidades from "../../assets/comCidades.png";
import anosNoMercado from "../../assets/anos-no-mercado.png";
import qauntProject from "../../assets/quantidade-projetos.png";
import imagemFundo from "../../assets/ImagemFundo.png";
import fotoUser from "../../assets/pessoa.jpg"

export default {
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

    impactos: [
        { id: 1, img: anosNoMercado },
        { id: 2, img: qauntProject },
        { id: 3, img: comCidades },
        { id: 4, img: comCidades }
    ],

    projetos: [
        {   
            id: 1,
            title: "Projeto Arquitetônico",
            description: "O Projeto Arquitetônico é o conjunto de desenhos e especificações que definem a organização dos espaços...",
            imagem: imagemFundo
        },
        {
            id: 2,
            title: "Projeto Estrutural", 
            description: "Descrição do projeto estrutural...",
            imagem: imagemFundo
        },
        {
            id: 3,
            title: "Projeto Elétrico",
            description: "Descrição do projeto elétrico...",
            imagem: imagemFundo
        },
        {
            id: 4,
            title: "Projeto Hidráulico",
            description: "Descrição do projeto hidráulico...",
            imagem: imagemFundo
        },
        {
            id: 4,
            title: "Projeto Hidráulico",
            description: "Descrição do projeto hidráulico...",
            imagem: imagemFundo
        },
        {
            id: 4,
            title: "Projeto Hidráulico",
            description: "Descrição do projeto hidráulico...",
            imagem: imagemFundo
        },
        {
            id: 4,
            title: "Projeto Hidráulico",
            description: "Descrição do projeto hidráulico...",
            imagem: imagemFundo
        }
    ],

    servicos: [
        {
            id: 1,
            title: "Serviço 1",
            description: "Descrição do serviço 2msssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
            image: imagemFundo 
        },
        {
            id: 2,
            title: "Serviço 2", 
            description: "Descrição do serviço 2",
            image: imagemFundo 
        },
        {
            id: 2,
            title: "Serviço 2", 
            description: "Descrição do serviço 2",
            image: imagemFundo 
        },
        {
            id: 2,
            title: "Serviço 2", 
            description: "Descrição do serviço 2",
            image: imagemFundo 
        },
        {
            id: 2,
            title: "Serviço 2", 
            description: "Descrição do serviço 2",
            image: imagemFundo 
        },
        {
            id: 2,
            title: "Serviço 2", 
            description: "Descrição do serviço 2",
            image: imagemFundo 
        },
        {
            id: 2,
            title: "Serviço 2", 
            description: "Descrição do serviço 2",
            image: imagemFundo 
        },
        {
            id: 2,
            title: "Serviço 2", 
            description: "Descrição do serviço 2",
            image: imagemFundo 
        },
        {
            id: 2,
            title: "Serviço 2", 
            description: "Descrição do serviço 2",
            image: imagemFundo 
        },
        {
            id: 2,
            title: "Serviço 2", 
            description: "Descrição do serviço 2",
            image: imagemFundo 
        },
        {
            id: 2,
            title: "Serviço 2", 
            description: "Descrição do serviço 2",
            image: imagemFundo 
        },
        {
            id: 2,
            title: "Serviço 2", 
            description: "Descrição do serviço 2",
            image: imagemFundo 
        },
        {
            id: 2,
            title: "Serviço 2", 
            description: "Descrição do serviço 2msssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
            image: imagemFundo 
        },
        {
            id: 2,
            title: "Serviço 2", 
            description: "Descrição do serviço 2",
            image: imagemFundo 
        }
    ],

    reviewClientes: [
        {
            id: 1,
            notaStar: 4.5,
            maxnotaStar: 5,
            description: "A Vale Júnior transformou meu sonho em realidade! O projeto arquitetônico ficou lindo e o preço coube no meu bolso. A equipe foi super atenciosa e paciente com todas minhas dúvidas.",
            imagem: fotoUser,
            nameUser: "Pedro Silva",
            funcaoUser: "Proprietário da residência"
        },
        {
            id:2, 
            notaStar: 5,
            maxnotaStar: 5,
            description: "Serviço excepcional! A equipe da Vale Júnior entregou um projeto inovador que superou todas as minhas expectativas. Profissionais muito competentes e dedicados.",
            imagem: fotoUser,
            nameUser: "Ana Oliveira",
            funcaoUser: "Arquiteta"
        },
        {
            id: 3,
            notaStar: 4,
            maxnotaStar: 5,
            description: "Excelente custo-benefício. O projeto foi entregue dentro do prazo e com uma qualidade impressionante. Recomendo fortemente para quem busca qualidade.",
            imagem: fotoUser,
            nameUser: "Carlos Santos",
            funcaoUser: "Empresário"
        },
        {
            id: 4,
            notaStar: 4.5,
            maxnotaStar: 5,
            description: "Fiquei impressionado com a atenção aos detalhes. Cada aspecto do projeto foi cuidadosamente planejado e executado. Equipe muito profissional!",
            imagem: fotoUser,
            nameUser: "Mariana Costa",
            funcaoUser: "Interior designer"
        },
        {
            id: 6,
            notaStar: 5,
            maxnotaStar: 5,
            description: "Simplesmente perfeito! Do atendimento ao resultado final, tudo foi impecável. Minha casa ficou exatamente como eu sonhava. Muito obrigado!",
            imagem: fotoUser,
            nameUser: "Roberto Almeida",
            funcaoUser: "Advogado"
        }
    ],
    responsiveOptionsReview: [
        {
            breakpoint: '1400px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 1,
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

    dadosDiretoria: [
        {
            id: 1,
            title: "Diretoria da Presidência",
            membros: [
                { id: 1, name: "João", funcao: "Presidente" },
                { id: 2, name: "Maria", funcao: "Assessora" }
            ]
        },
        {
            id: 2,
            title: "Diretoria VPGG",
            membros: [{ id: 3, name: "Pedro", funcao: "Diretor" }]
        },
        {
            id: 3,
            title: "Diretoria Comercial",
            membros: []
        },
        {
            id: 4,
            title: "Diretoria de Projetos",
            membros: []
        }
    ]

};