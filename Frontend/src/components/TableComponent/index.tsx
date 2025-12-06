import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Modal, ModalHeader, ModalBody, ModalFooter } from "flowbite-react";
import { FaEdit, FaTrashAlt, FaEllipsisH, FaUser, FaBriefcase, FaCircle } from "react-icons/fa";
import "./Style.css";

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

interface TableComponentProps {

  user?: User;

  users?: User[];
}

function TableComponent({ user, users }: TableComponentProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const userList = users || (user ? [user] : []);

  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const handleOpenModal = (user: User) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  if (userList.length === 0) {
    return <div className="text-center p-4">Nenhum usuário encontrado</div>;
  }

  return (
    <>

      <div className="hidden md:block overflow-x-auto rounded-lg border border-red-200 dark:border-gray-700 containerTable">
        <Table hoverable>
          <TableHead>
            <TableRow className="bg-gray-50 dark:bg-gray-800">
              <TableHeadCell className="w-16">Foto</TableHeadCell>
              <TableHeadCell>Nome</TableHeadCell>
              <TableHeadCell>Cargo</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
              <TableHeadCell className="w-48 text-center">Ações</TableHeadCell>
            </TableRow>
          </TableHead>
          
          <TableBody className="divide-y containerText">
            {userList.map((user, index) => (
              <TableRow key={user.id || index} className="bg-black">
                <TableCell>
                  <div className="flex items-center justify-center">
                    <img 
                      src={user.avatarUrl} 
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                    />
                  </div>
                </TableCell>
                
                <TableCell className="font-medium">
                  {user.name}
                </TableCell>
                
                <TableCell className="text-gray-600 dark:text-gray-300">
                  {user.position}
                </TableCell>
                
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.status === 'ativo' 
                      ? 'bg-green-100 dark:text-green-800' 
                      : 'bg-red-100'
                  }`}>
                    {formatStatus(user.status)}
                  </span>
                </TableCell>
                
                <TableCell>
                  <div className="flex justify-center space-x-3">
                    <button 
                      className="flex items-center space-x-1 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <FaEdit className="w-4 h-4" />
                      <span>Editar</span>
                    </button>
                    <button 
                      className="flex items-center space-x-1 px-3 py-1.5 text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      title="Excluir"
                    >
                      <FaTrashAlt className="w-4 h-4" />
                      <span>Excluir</span>
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Cards para Mobile */}
      <div className="md:hidden space-y-4">
        {userList.map((user, index) => (
          <div key={user.id || index} className="bg-white rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <img 
                  src={user.avatarUrl} 
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-black">{user.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-black-300">{user.position}</p>
                  <span className={`inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                    user.status === 'ativo' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    <FaCircle className={`w-2 h-2 mr-1 ${user.status === 'ativo' ? 'text-green-500' : 'text-red-500'}`} />
                    {formatStatus(user.status)}
                  </span>
                </div>
              </div>
              
              <button 
                onClick={() => handleOpenModal(user)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                title="Mais informações"
              >
                <FaEllipsisH className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-4 flex justify-between border-t pt-4 dark:border-gray-700">
              <button 
                className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Editar"
              >
                <FaEdit className="w-4 h-4" />
                <span>Editar</span>
              </button>
              <div className="w-4"></div>
              <button 
                className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Excluir"
              >
                <FaTrashAlt className="w-4 h-4" />
                <span>Excluir</span>
              </button>
            </div>
          </div>
        ))}
      </div>


      <Modal show={openModal} onClose={() => setOpenModal(false)} size="md" className="custom-modal-bg">
        <ModalHeader >
            <h1 className="text-gray-900 dark:text-black">
                Detalhes do Usuário
            </h1>
        </ModalHeader>
        <ModalBody>
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <img 
                  src={selectedUser.avatarUrl} 
                  alt={selectedUser.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 dark:border-black-700 mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900 dark:text-black text-center">
                  {selectedUser.name}
                </h3>
                <p className="text-black-600 dark:text-black text-center">
                  {selectedUser.position}
                </p>
                <span className={`inline-flex items-center mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                  selectedUser.status === 'ativo' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  <FaCircle className={`w-2 h-2 mr-2 ${selectedUser.status === 'ativo' ? 'text-green-500' : 'text-red-500'}`} />
                  {formatStatus(selectedUser.status)}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <FaUser className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Nome Completo</p>
                    <p className="text-gray-900 dark:text-black">{selectedUser.name}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaBriefcase className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Cargo</p>
                    <p className="text-gray-900 dark:text-black">{selectedUser.position}</p>
                  </div>
                </div>

                {selectedUser.email && (
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">E-mail</p>
                      <p className="text-gray-900 dark:text-black">{selectedUser.email}</p>
                    </div>
                  </div>
                )}

                {selectedUser.telefone && (
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Telefone</p>
                      <p className="text-gray-900 dark:text-black">{selectedUser.telefone}</p>
                    </div>
                  </div>
                )}

                {selectedUser.departamento && (
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Departamento</p>
                      <p className="text-gray-900 dark:text-black">{selectedUser.departamento}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter className="flex justify-between">
          <button
            onClick={() => setOpenModal(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-black-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Fechar
          </button>
          <div className="flex space-x-2">
            <button
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FaEdit className="w-4 h-4 inline mr-2" />
              Editar
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FaTrashAlt className="w-4 h-4 inline mr-2" />
              Excluir
            </button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default TableComponent;