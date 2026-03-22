import { GETProyectoResponseDTO, Proyecto } from "../types/ProyectosTypes";

export const ToGETProyectoResponseDTOFromProyecto = (proyectoModel: Proyecto): GETProyectoResponseDTO =>
{
    const proyectoDTO: GETProyectoResponseDTO =
    {
        id: proyectoModel.id,
        title: proyectoModel.titulo,
        description: proyectoModel.descripcion,
        career: proyectoModel.carrera,
        studentId: proyectoModel.estudiante_id,
        createdAt: proyectoModel.creado_en
    }

    return proyectoDTO;
}