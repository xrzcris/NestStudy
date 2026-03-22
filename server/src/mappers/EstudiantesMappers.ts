import { Estudiante, GETEstudianteResponseDTO } from "../types/EstudiantesTypes";

export const ToGETEstudianteResponseDTOFromEstudiante = (estudianteModel: Estudiante): GETEstudianteResponseDTO =>
{
    const estudianteDTO: GETEstudianteResponseDTO =
    {
        id: estudianteModel.id,
        name: estudianteModel.nombre,
        email: estudianteModel.email,
        career: estudianteModel.carrera,
        createdAt: estudianteModel.creado_en 
    }

    return estudianteDTO;
}