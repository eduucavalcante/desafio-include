import { useState, useEffect } from "react";
import AdminNavbar from "../../components/NavBarAdmin";
import TableComponent from "../../components/TableComponent";
import { FaRegEdit } from "react-icons/fa";
import { LuImageMinus } from "react-icons/lu";
import { AiOutlinePlus } from "react-icons/ai";
import Button from "../../components/Button";
import FormAddMember from "../../components/FormAddMember";

interface User {
  id?: number;
  name: string;
  position: string;
  status: string;
  avatarUrl: string;
  email: string;
  telefone: string;
  departamento: string;
}

function NossoTimeAdmin() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);


  const [isAdding, setIsAdding] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {

      const mockUsers: User[] = [
        {
          id: 1,
          name: "João Paulo Santos",
          position: "Diretor de Projetos",
          status: "ativo",
          avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
          email: "joao@empresa.com",
          telefone: "(11) 99999-9999",
          departamento: "TI"
        },
        {
          id: 2,
          name: "Ana Maria",
          position: "Coordenadora de Marketing",
          status: "ativo",
          avatarUrl: "https://randomuser.me/api/portraits/women/12.jpg",
          email: "ana@empresa.com",
          telefone: "(11) 98888-7777",
          departamento: "Marketing"
        },
      ];

      setUsers(mockUsers);
      setLoading(false);
    };

    fetchUsers();
  }, []);


  const handleSaveNew = (data: User) => {
    setUsers(prev => [...prev, { ...data, id: Date.now() }]);
    setIsAdding(false);
  };


  const handleSaveEdit = (data: User) => {
    setUsers(prev =>
      prev.map(u => (u.id === data.id ? data : u))
    );
    setEditingUser(null);
  };

  return (
    <div>
      <AdminNavbar />

      <div className="p-6 pt-24 lg:pt-6">
        <div className="max-w-7xl mx-auto">

          {isAdding || editingUser ? (
            <FormAddMember
              initialData={editingUser ?? undefined}
              onSave={editingUser ? handleSaveEdit : handleSaveNew}
              onCancel={() => {
                setIsAdding(false);
                setEditingUser(null);
              }}
            />
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Nosso Time
                </h1>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    text="Adicionar Membro"
                    icon={AiOutlinePlus}
                    color="#004BAF"
                    colorIcon="#FFF"
                    onClick={() => setIsAdding(true)}
                  />
                </div>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  <p className="mt-4 text-gray-600">Carregando usuários...</p>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow p-4">
                  <TableComponent
                    users={users}
                    onEdit={(user) => setEditingUser(user)}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default NossoTimeAdmin;
