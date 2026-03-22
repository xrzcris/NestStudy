import { Colaboracion, GETColaboracionResponseDTO } from "../types/ColaboracionesTypes";

export const ToGETColaboracionResponseDTOFromColaboracion = (colaboracionModel: Colaboracion): GETColaboracionResponseDTO =>
{
    const colaboracionDTO: GETColaboracionResponseDTO =
    {
        id: colaboracionModel.id,
        content: colaboracionModel.contenido,
        projectId: colaboracionModel.proyecto_id,
        studentId: colaboracionModel.estudiante_id,
        createdAt: colaboracionModel.creado_en
    }

    return colaboracionDTO;
}