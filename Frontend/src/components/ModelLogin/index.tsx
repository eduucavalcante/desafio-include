"use client";

import { Button, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { useState } from "react";
import { FaUserCircle } from 'react-icons/fa';
import { loginAdmin } from '../../api/auth'; 

interface MoldaLoginProps {
  show: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

function MoldaLogin({ show, onClose, onLoginSuccess }: MoldaLoginProps) { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    setError(null);
    setEmail(""); 
    setPassword("");
    onClose();
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {

      const data = await loginAdmin({ email, password });
      

      if (onLoginSuccess) {
          onLoginSuccess();
      }
      handleClose();

    } catch (err) {
      setError((err as Error).message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal 
      show={show} 
      size="sm" 
      onClose={handleClose} 
      popup
      className="[&>div]:bg-gray-100 [&>div]:shadow-2xl [&>div]:rounded-xl"
      theme={{ root: { base: "fixed inset-0 z-50 flex h-screen items-center justify-center bg-black/75" } }}
    >
      <ModalHeader 
        // className="absolute top-4 right-4 !p-0"
        theme={{ close: { 
          base: "ml-auto inline-flex items-center rounded-md  hover:bg-red-600 p-2 text-sm text-white",
          icon: "h-5 w-5 !text-white"
        }}}
      />
      
      <ModalBody className="pb-8 pt-4">
        <form onSubmit={handleLogin} className="space-y-5 flex flex-col items-center">
          
          <div className="text-blue-600 mb-2">
            <FaUserCircle size={50} />
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 -mt-1">
            Admin Login
          </h3>
          
          <TextInput
            id="email" 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
            disabled={loading}
            theme={{
              field: {
                input: {
                  base: "bg-white",
                  colors: {
                    gray: "border-gray-300 focus:border-blue-500"
                  }
                }
              }
            }}
          />

          <TextInput
            id="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full"
            disabled={loading}
            theme={{
              field: {
                input: {
                  base: "bg-white",
                  colors: {
                    gray: "border-gray-300 focus:border-blue-500"
                  }
                }
              }
            }}
          />
          

          {error && (
            <p className="text-red-500 text-sm w-full text-center">
              {error}
            </p>
          )}
          
          <div className="w-full flex justify-start">
            <a 
              href="#" 
              className="text-sm text-blue-600 hover:underline"
            >
              Esqueceu a senha?
            </a>
          </div>

          <div className="w-full">
            <Button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
              disabled={loading}
            >
              {loading ? 'Aguarde...' : 'Login'}
            </Button>
          </div>
          
        </form>
      </ModalBody>
    </Modal>
  );
}

export default MoldaLogin;