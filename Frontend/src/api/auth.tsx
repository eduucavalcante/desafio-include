import axios from "axios"
import apiClient from "./clientApi"

interface LoginDados {
    email: string,
    password: string
}

interface UserData {
    name: string;
    email: string;
    permission: string;
    role: string;
}

export const loginAdmin = async ({ email, password }: LoginDados): Promise<UserData> => {
    try {
        const response = await apiClient.post<UserData>('api/v1/login/', {
            email,
            password
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 401) {
                throw new Error("Email ou senha inválidos.");
            }
            if (error.response.status === 400) {
                throw new Error("Dados inválidos. Verifique o formato do email.");
            }
            throw new Error(`Erro no servidor (${error.response.status}).`);
        }
        throw new Error("Falha na conexão de rede. A API está offline?");
    }
}
