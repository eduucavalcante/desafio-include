import { Modal, ModalBody, ModalHeader  } from "flowbite-react";

interface Membro {
  id: number;
  name: string;
  funcao: string;
  imagem?: string;
}

interface Diretoria {
  id: number;
  title: string;
  membros: Membro[];
}

interface ModalEquipeProps {
  isOpen: boolean;
  onClose: () => void;
  dados: Diretoria | null;
}

export default function ModalEquipe({ isOpen, onClose, dados }: ModalEquipeProps) {
  if (!dados) return null;

  return (
    <Modal show={isOpen} onClose={onClose} size="lg" popup>
      <ModalHeader />
      <ModalBody>
        <div className="text-center text-[#07304A]">
          <h2 className="text-2xl font-bold mb-6">{dados.title}</h2>

          <div className="grid grid-cols-3 gap-6 place-items-center">
            {dados.membros.map((membro) => (
              <div 
                key={membro.id}
                className="flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gray-200 border-4 border-orange-400 overflow-hidden">
                  {membro.imagem ? (
                    <img
                      src={membro.imagem}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                      foto
                    </div>
                  )}
                </div>

                <p className="mt-2 font-medium">{membro.name}</p>
                <p className="text-sm opacity-70">{membro.funcao}</p>
              </div>
            ))}
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
