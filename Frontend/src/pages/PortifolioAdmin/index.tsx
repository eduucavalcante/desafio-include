import AdminNavbar from "../../components/NavBarAdmin"
import CardPortifolioAdmin from "../../components/CardPortifolioAdmin"
import Button from "../../components/Button"
import { AiOutlinePlus } from "react-icons/ai";
import FormPortifolio from "../../components/FormPortifolioAdmin";
import { useState } from "react";

interface ServicoFormData {
    nome: string;
    descricao: string;
    beneficios: string;
    imageUrl: string;
}


function PortifolioAdmin(){

    const cardPortfolios = [
        {id:1, title: "Analise de dados", description: "Teste desa baboseira aqui meu deus"},
        {id:2, title: "Analise de alo", description: "Teste desa baboseira aqui meu deus"},
        {id:3, title: "Analise de teste", description: "Teste desa baboseira aqui meu deus"},
        {id:4, title: "Analise de dados", description: "Teste desa baboseira aqui meu deus"},
    ]
    const [isAdding, setIsAdding] = useState(false);
    const [editingService, setEditingService] = useState<ServicoFormData | null>(null);

    const handleSaveService = (data: ServicoFormData) => {
        console.log("Novo portifolio:", data);
        setIsAdding(false);
    };

    const handleSaveEdit = (data: ServicoFormData) => {
        console.log("Serviço editado:", data);

        setEditingService(null);
    };

    const handleEdit = (service: ServicoFormData) => {
        setEditingService(service);
    };


    return(
        <div>
            <AdminNavbar/>
            <div className="p-6 pt-24 lg:pt-6">
                <div className="max-w-7xl mx-auto">
                    {isAdding || editingService ? (
                        <FormPortifolio
                            onSave={editingService ? handleSaveEdit : handleSaveService}
                            onCancel={() => {
                                setIsAdding(false);
                                setEditingService(null);
                            }}
                            initialData={editingService ?? undefined}
                        />
                    ) : (
                        <>
                            <div className="mb-8 flex justify-between">
                                <h1 className="text-3xl font-bold text-gray-800">Portifolio</h1>

                                <Button
                                    text="Adicionar Serviço"
                                    icon={AiOutlinePlus}
                                    color="#004BAF"
                                    colorIcon="#FFF"
                                    onClick={() => setIsAdding(true)}
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {cardPortfolios.map(card => (
                                    <CardPortifolioAdmin
                                        key={card.id}
                                        title={card.title}
                                        description={card.description}
                                        onEdit={() =>
                                            handleEdit({
                                                nome: card.title,
                                                descricao: card.description,
                                                beneficios: "pendente",
                                                imageUrl: "pendente"
                                            })
                                        }
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PortifolioAdmin;