export interface Colaboracion
{
    id: number;
    contenido: string;
    proyecto_id: number;
    estudiante_id: number;
    creado_en: string;
}

export interface GETColaboracionResponseDTO
{
    id: number;
    content: string;
    projectId: number;
    studentId: number;
    createdAt: string;
}

export interface POSTColaboracionRequestDTO
{
    content: string;
    projectId: number;
    studentId: number;
}

export interface PUTColaboracionRequestDTO
{
    content: string;
    projectId: number;
    studentId: number;
}