export interface Diretoria {
    id: number;
    title: string;
    membros: {
        id: number;
        name: string;
        funcao: string;
        imagem?: string;
    }[];
}