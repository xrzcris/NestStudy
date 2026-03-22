export interface Estudiante
{
    id: number;
    nombre: string;
    email: string;
    password: string;
    carrera: string;
    creado_en: string; 
}

export interface GETEstudianteResponseDTO
{
    id: number;
    name: string;
    email: string;
    career: string;
    createdAt: string; 
}

export interface POSTEstudianteRequestDTO
{
    name: string;
    email: string;
    password: string;
    career: string;
}

export interface PUTEstudianteRequestDTO
{
    name: string;
    email: string;
    career: string;
}

export interface POSTLoginRequestDTO
{
    email: string;
    password: string;
}