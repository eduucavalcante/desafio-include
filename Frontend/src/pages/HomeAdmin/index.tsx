import AdminNavbar from "../../components/NavBarAdmin";
import CardAdminPanel from "../../components/CardAdminPanel";
import { 
  FaPhoneAlt, 
  FaUsers, 
  FaProjectDiagram, 
  FaHistory, 
  FaUserCog, 
  FaFileAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
  FaUserFriends,
  FaLock,
  FaEye
} from "react-icons/fa";
import { Route } from "react-router-dom";

function HomeAdmin() {
    const cardUsers = [
        {
            id: 1, 
            title: "Contatos Institucionais",
            icon: FaPhoneAlt, 
            description: "Gerencie e-mails, telefones, endereços e redes sociais.",
            color: "#ffffff",
            cardColor: "#2B7FFF",
            route: "/ContatosAdmin"
        },
        {
            id: 2, 
            title: "Nosso Time",
            icon: FaUsers, 
            description: "Gerencie membros, cargos e informações da equipe.",
            color: "#ffffff",
            cardColor: "#AD46FF",
            route: "/NossoTimeAdmin"
        },
        {
            id: 3, 
            title: "Portfólio",
            icon: FaProjectDiagram, 
            description: "Adicione e edite serviços oferecidos pela empresa.",
            color: "#ffffff",
            cardColor: "#00C951",
            route: "/PortifolioHome"
        },
        {
            id: 4, 
            title: "Conteúdo Institucional",
            icon: FaFileAlt, 
            description: "Edite Missão, visão, valores e história da empresa.",
            color: "#ffffff",
            cardColor: "#FF6900",
            route: "/ConteudoInstituciona"
        },

    ];
    
    return(
        <div >
            <AdminNavbar/>
            <div className="p-6 pt-24 lg:pt-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Administrativo</h1>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cardUsers.map((card) => (
                            <CardAdminPanel
                                key={card.id}
                                title={card.title}
                                icon={card.icon}
                                route={card.route}
                                description={card.description}
                                color={card.color}
                                cardColor={card.cardColor}
                            />
                        ))}
                    </div>
                
                </div>
            </div>
        </div>
    )
}

export default HomeAdmin;