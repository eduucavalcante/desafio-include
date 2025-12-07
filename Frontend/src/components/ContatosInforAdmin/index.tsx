import React, { useState } from "react";

interface ContatosInforAdminProps {
  editable: boolean;
  onSave: (data: ContatoFormData) => void;
  onCancel: () => void;
}

interface ContatoFormData {
  email: string;
  whatsapp: string;
  endereco: string;
  facebook: string;
  instagram: string;
  linkedin: string;
}

function ContatosInforAdmin({ editable, onSave, onCancel }: ContatosInforAdminProps) {

    const [form, setForm] = useState({
        email: "contato@valejr.com.br",
        whatsapp: "+55 85 99999-9999",
        endereco: "Av. UFC RUSSAS",
        facebook: "facebook.com/valejr",
        instagram: "@valejr",
        linkedin: "linkedin.com/company/valejr",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="w-full p-4 md:p-6">

            {editable && (
                <div className="flex justify-end gap-3 mb-4">
                    <button
                        onClick={() => onCancel()}
                        className="px-4 py-2 rounded-lg bg-gray-300 text-gray-800"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={() => onSave(form)}
                        className="px-4 py-2 rounded-lg bg-green-600 text-white"
                    >
                        Salvar
                    </button>
                </div>
            )}

            <div className="bg-white rounded-2xl shadow p-4 md:p-6">
                
                <div className="mb-5">
                    <label className="block mb-1 font-semibold text-gray-700">E-mail Institucional</label>
                    <input
                        name="email"
                        type="text"
                        value={form.email}
                        onChange={handleChange}
                        disabled={!editable}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-3"
                    />
                </div>

                <div className="mb-5">
                    <label className="block mb-1 font-semibold text-gray-700">WhatsApp</label>
                    <input
                        name="whatsapp"
                        type="text"
                        value={form.whatsapp}
                        onChange={handleChange}
                        disabled={!editable}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-3"
                    />
                </div>

                <div className="mb-8">
                    <label className="block mb-1 font-semibold text-gray-700">Endereço</label>
                    <input
                        name="endereco"
                        type="text"
                        value={form.endereco}
                        onChange={handleChange}
                        disabled={!editable}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-3"
                    />
                </div>

                <h2 className="text-lg font-semibold text-gray-800 mb-4">Redes Sociais</h2>


                <div className="mb-5">
                    <label className="block mb-1 text-gray-700">Facebook</label>
                    <input
                        name="facebook"
                        value={form.facebook}
                        onChange={handleChange}
                        disabled={!editable}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-3"
                    />
                </div>

                <div className="mb-5">
                    <label className="block mb-1 text-gray-700">Instagram</label>
                    <input
                        name="instagram"
                        value={form.instagram}
                        onChange={handleChange}
                        disabled={!editable}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-3"
                    />
                </div>

                <div className="mb-5">
                    <label className="block mb-1 text-gray-700">LinkedIn</label>
                    <input
                        name="linkedin"
                        value={form.linkedin}
                        onChange={handleChange}
                        disabled={!editable}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-3"
                    />
                </div>

            </div>

        </div>
    );
}

export default ContatosInforAdmin;
