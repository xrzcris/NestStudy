import { Colaboracion } from "../types/ColaboracionesTypes";
import { GETOneProyectoResponseDTO, GETProyectoResponseDTO, Proyecto } from "../types/ProyectosTypes";
import { ToGETColaboracionResponseDTOFromColaboracion } from "./ColaboracionesMappers";

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

export const ToGETOneProyectoResponseDTOFromProyecto = (proyectoModel: Proyecto, colaboraciones: Colaboracion[] | null): GETOneProyectoResponseDTO =>
{
    const proyectoDTO: GETOneProyectoResponseDTO =
    {
        id: proyectoModel.id,
        title: proyectoModel.titulo,
        description: proyectoModel.descripcion,
        career: proyectoModel.carrera,
        studentId: proyectoModel.estudiante_id,
        createdAt: proyectoModel.creado_en,
        comments: colaboraciones == null ? [] : colaboraciones.map(ToGETColaboracionResponseDTOFromColaboracion)
    }

    return proyectoDTO;
}