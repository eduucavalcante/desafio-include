import { useEffect, useState } from "react";

interface AddServicoFormProps {
    onSave: (data: ServicoFormData) => void;
    onCancel: () => void;
    initialData?: ServicoFormData;
}

interface ServicoFormData {
    nome: string;
    descricao: string;
    beneficios: string;
    imageUrl: string;
}

function FormPortifolio({ onSave, onCancel, initialData }: AddServicoFormProps) {

    const [form, setForm] = useState<ServicoFormData>({
        nome: "",
        descricao: "",
        beneficios: "",
        imageUrl: ""
    });

    useEffect(() => {
        if (initialData) {
            setForm(initialData);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow">
            <h1 className="text-2xl font-bold mb-6">
                {initialData ? "Editar Portifólio" : "Adicionar Portifólio"}
            </h1>
            <div className="mb-5">
                <input
                    name="nome"
                    placeholder="Nome do Serviço"
                    value={form.nome}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                />
            </div>

            <textarea
                name="descricao"
                placeholder="Descrição"
                value={form.descricao}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mb-5"
            />

            <textarea
                name="beneficios"
                placeholder="Benefícios (um por linha)"
                value={form.beneficios}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mb-5"
            />

            <input
                name="imageUrl"
                placeholder="URL da imagem"
                value={form.imageUrl}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mb-5"
            />

            <div className="flex gap-4">
                <button
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg"
                    onClick={() => onSave(form)}
                >
                    Salvar
                </button>

                <button
                    className="px-5 py-2 bg-gray-300 rounded-lg"
                    onClick={onCancel}
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}

export default FormPortifolio;