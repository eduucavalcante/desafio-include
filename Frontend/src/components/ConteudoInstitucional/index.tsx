import React, { useState } from "react";
import Button from "../Button";
import { FaRegEdit } from "react-icons/fa";

function ConteudoInstucional() {
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        missao: "Desenvolver soluções inovadoras que transformem empresas e formem profissionais de excelência.",
        visao: "Ser referência em consultoria júnior no Brasil, reconhecida pela qualidade e impacto dos nossos projetos.",
        valores: "Ética, Excelência, Inovação, Trabalho em equipe e Compromisso com resultados",
        historia: "Fundada em 2010, a Vale Jr nasceu com o propósito de conectar o conhecimento acadêmico às necessidades do mercado...",
        texto: "Somos uma empresa júnior de consultoria formada por estudantes comprometidos com a excelência.",
    });

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        console.log("Dados atualizados:", formData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    return (
        <div className="w-full p-4 md:p-6">

            <div className="bg-white rounded-2xl shadow p-4 md:p-6">

                <div className="flex justify-end mb-4">
                    {!isEditing ? (
                        <Button
                            text="Editar"
                            color="#004BAF"
                            colorIcon="#FFF"
                            icon={FaRegEdit}
                            onClick={() => setIsEditing(true)}
                        />
                    ) : (
                        <div className="flex gap-3">
                            <Button
                                text="Cancelar"
                                color="#F4F4F4"
                                textColor="#000"
                                onClick={handleCancel}
                            />
                            <Button
                                text="Salvar"
                                color="#089400"
                                colorIcon="#FFF"
                                onClick={handleSave}
                            />
                        </div>
                    )}
                </div>


                <div className="mb-5">
                    <label className="block mb-1 text-sm font-semibold text-gray-700">Missão</label>
                    <input
                        type="text"
                        name="missao"
                        disabled={!isEditing}
                        value={formData.missao}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-3 text-gray-700"
                    />
                </div>

                <div className="mb-5">
                    <label className="block mb-1 text-sm font-semibold text-gray-700">Visão</label>
                    <input
                        type="text"
                        name="visao"
                        disabled={!isEditing}
                        value={formData.visao}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-3 text-gray-700"
                    />
                </div>

                <div className="mb-5">
                    <label className="block mb-1 text-sm font-semibold text-gray-700">Valores</label>
                    <input
                        type="text"
                        name="valores"
                        disabled={!isEditing}
                        value={formData.valores}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-3 text-gray-700"
                    />
                </div>

    
                <div className="mb-5">
                    <label className="block mb-1 text-sm font-semibold text-gray-700">História</label>
                    <input
                        type="text"
                        name="historia"
                        disabled={!isEditing}
                        value={formData.historia}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-3 text-gray-700"
                    />
                </div>


                <div className="mb-5">
                    <label className="block mb-1 text-sm font-semibold text-gray-700">Texto Institucional</label>
                    <input
                        type="text"
                        name="texto"
                        disabled={!isEditing}
                        value={formData.texto}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-3 text-gray-700"
                    />
                </div>
            </div>
        </div>
    );
}

export default ConteudoInstucional;
