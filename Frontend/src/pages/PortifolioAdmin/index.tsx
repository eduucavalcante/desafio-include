import AdminNavbar from "../../components/NavBarAdmin"
import CardPortifolioAdmin from "../../components/CardPortifolioAdmin"

function PortifolioAdmin(){

    const cardPortfolios = [
        {id:1, title: "Analise de dados", description: "Teste desa baboseira aqui meu deus"},
        {id:2, title: "Analise de alo", description: "Teste desa baboseira aqui meu deus"},
        {id:3, title: "Analise de teste", description: "Teste desa baboseira aqui meu deus"},
        {id:4, title: "Analise de dados", description: "Teste desa baboseira aqui meu deus"},
    ]


    return(
        <div>
            <AdminNavbar/>
            <div className="p-6 pt-24 lg:pt-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Pótifolios</h1>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cardPortfolios.map((card) =>(
                            <CardPortifolioAdmin
                                key={card.id}
                                title={card.title}
                                description={card.description}
                            />
                        ))}
                    </div>
                
                </div>
            </div>
        </div>
    )
}

export default PortifolioAdmin;