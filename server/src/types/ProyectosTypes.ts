export interface Proyecto
{
    id: number;
    titulo: string;
    descripcion: string;
    carrera: string;
    estudiante_id: number;
    creado_en: string;
}

export interface GETProyectoResponseDTO
{
    id: number;
    title: string;
    description: string;
    career: string;
    studentId: number;
    createdAt: string;
}

export interface POSTProyectoRequestDTO
{
    title: string;
    description: string;
    career: string;
    studentId: number;
}

export interface PUTProyectoRequestDTO
{
    title: string;
    description: string;
    career: string;
    studentId: number;
}