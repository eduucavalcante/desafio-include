import { useState, useEffect } from "react";
import AdminNavbar from "../../components/NavBarAdmin";
import TableComponent from "../../components/TableComponent";
import { FaRegEdit } from "react-icons/fa";
import { LuImageMinus } from "react-icons/lu";
import { AiOutlinePlus } from "react-icons/ai";
import Button from "../../components/Button";

interface User {
  id: number;
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

  useEffect(() => {

    const fetchUsers = async () => {
      try {
        // const response = await fetch('/api/users');
        // const data = await response.json();
        

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
            name: "João Paulo Santos",
            position: "Diretor de Projetos",
            status: "ativo",
            avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
            email: "joao@empresa.com",
            telefone: "(11) 99999-9999",
            departamento: "TI"
          },
          {
            id: 3,
            name: "João Paulo Santos",
            position: "Diretor de Projetos",
            status: "ativo",
            avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
            email: "joao@empresa.com",
            telefone: "(11) 99999-9999",
            departamento: "TI"
          },

        ];
        
        setUsers(mockUsers);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <AdminNavbar />
      <div className="p-6 pt-24 lg:pt-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Nosso Time</h1>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto order-2 md:order-none">
                <Button
                    text="Adicionar Membro"
                    icon={AiOutlinePlus}
                    color="#004BAF"
                    colorIcon="#FFF"

                />
                <Button
                    text="Gerenciar Mídias"
                    icon={LuImageMinus}
                    color="#9810FA"
                    colorIcon="#FFF"

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
              <TableComponent users={users} />
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}

export default NossoTimeAdmin;