import { useEffect, useState } from "react";

interface UserFormData {
  id?: number;
  name: string;
  position: string;
  status: string;
  avatarUrl: string;
  email: string;
  telefone: string;
  departamento: string;
}

interface AddMembroFormProps {
  initialData?: UserFormData;
  onSave: (data: UserFormData) => void;
  onCancel: () => void;
}

function FormAddMember({ initialData, onSave, onCancel }: AddMembroFormProps) {

  const [form, setForm] = useState<UserFormData>({
    name: "",
    position: "",
    status: "ativo",
    avatarUrl: "",
    email: "",
    telefone: "",
    departamento: ""
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h1 className="text-2xl font-bold mb-6">
        {initialData ? "Editar Membro" : "Adicionar Membro"}
      </h1>

      <input
        name="avatarUrl"
        placeholder="Foto (URL)"
        value={form.avatarUrl}
        onChange={handleChange}
        className="w-full border rounded-lg px-3 py-2 mb-5"
      />

      <input
        name="name"
        placeholder="Nome"
        value={form.name}
        onChange={handleChange}
        className="w-full border rounded-lg px-3 py-2 mb-5"
      />

      <input
        name="position"
        placeholder="Cargo/Função"
        value={form.position}
        onChange={handleChange}
        className="w-full border rounded-lg px-3 py-2 mb-5"
      />

      <textarea
        name="departamento"
        placeholder="Departamento"
        value={form.departamento}
        onChange={handleChange}
        className="w-full border rounded-lg px-3 py-2 mb-5"
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full border rounded-lg px-3 py-2 mb-5"
      />

      <input
        name="telefone"
        placeholder="Telefone"
        value={form.telefone}
        onChange={handleChange}
        className="w-full border rounded-lg px-3 py-2 mb-5"
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full border rounded-lg px-3 py-2 mb-5"
      >
        <option value="ativo">Ativo</option>
        <option value="inativo">Inativo</option>
      </select>

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

export default FormAddMember;