import React, { useState } from "react";
import AdminNavbar from "../../components/NavBarAdmin";
import ContatosInforAdmin from "../../components/ContatosInforAdmin";
import Button from "../../components/Button";
import { FaRegEdit } from "react-icons/fa";

interface ContatoFormData {
  email: string;
  whatsapp: string;
  endereco: string;
  facebook: string;
  instagram: string;
  linkedin: string;
}


function ContatosInstituAdmin() {

    const [isEditing, setIsEditing] = useState(false);

    const handleSave = (data: ContatoFormData) => {
        console.log("Dados atualizados:", data);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    return (
        <div>
            <AdminNavbar />

            <div className="p-6 pt-24 lg:pt-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h1 className="text-3xl font-bold text-gray-800">Contatos Administrativo</h1>

                        {!isEditing && (
                            <Button
                                text="Editar Dados"
                                icon={FaRegEdit}
                                color="#004BAF"
                                colorIcon="#FFF"
                                onClick={() => setIsEditing(true)}
                            />
                        )}
                    </div>

                    <ContatosInforAdmin
                        editable={isEditing}
                        onSave={handleSave}
                        onCancel={handleCancel}
                    />

                </div>
            </div>

        </div>
    );
}

export default ContatosInstituAdmin;
