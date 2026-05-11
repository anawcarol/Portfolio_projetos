export interface Usuario {
    id: number;
    descricao: string;
    nome: string;
    projetos: number[]; // Array de IDs dos projetos
    skills: number[]; // Array de IDs das skills
    certificados: number[]; // Array de IDs dos certificados

}