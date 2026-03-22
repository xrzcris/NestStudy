import { ToGETProyectoResponseDTOFromProyecto } from "../mappers/ProyectosMappers";
import { ProyectosRepository } from "../repository/ProyectosRepository";
import { GETProyectoResponseDTO, POSTProyectoRequestDTO, Proyecto, PUTProyectoRequestDTO } from "../types/ProyectosTypes";
import { Request, Response } from 'express';

/**
 * @openapi
 * tags:
 *   name: Proyectos
 *   description: Todo lo relacionado con proyectos
 */
export class ProyectosController
{
    /**
     * @openapi
     * /api/proyectos:
     *   post:
     *     summary: Crear un proyecto
     *     tags: [Proyectos]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *               description:
     *                 type: string
     *               career:
     *                 type: string
     *               studentId:
     *                 type: number
     *             example:
     *               title: "string"
     *               description: "string"
     *               career: "string"
     *               studentId: 1
     *     responses:
     *       201:
     *         description: GETProyectoResponseDTO
     *       500:
     *         description: Internal server error
     */
    static Create = async (req: Request<{}, {}, POSTProyectoRequestDTO>, res: Response) =>
    {
        try
        {
            const nuevoProyecto: Proyecto | null = await ProyectosRepository.CreateProyecto(req.body);

            const nuevoProyectoDTO = ToGETProyectoResponseDTOFromProyecto(nuevoProyecto!);

            res.status(201).json(nuevoProyectoDTO);
        }
        catch (error)
        {
            res.status(500).json({ message: '💀 Internal server error. ' + error});
        }
    }

    /**
     * @openapi
     * /api/proyectos:
     *   get:
     *     summary: Obtener todos los proyectos
     *     tags: [Proyectos]
     *     responses:
     *       200:
     *         description: GETProyectoResponseDTO
     *       500:
     *         description: Internal server error
     */
    static GetAll = async (req: Request, res: Response) =>
    {
        try
        {
            const proyectos: Proyecto[] | null = await ProyectosRepository.ReadAllProyectos();

            if (proyectos == null)
            {
                res.status(200).json([]);

                return
            }

            const proyectosDTO: GETProyectoResponseDTO[] = proyectos.map(ToGETProyectoResponseDTOFromProyecto);

            res.status(200).json(proyectosDTO);
        }
        catch (error)
        {
            res.status(500).json({ message: '💀 Internal server error. ' + error});
        }
    }

    /**
     * @openapi
     * /api/proyectos/{id}:
     *   get:
     *     summary: Obtener proyecto por Id
     *     tags: [Proyectos]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: Id
     *     responses:
     *       200:
     *         description: GETProyectoResponseDTO
     *       404:
     *         description: Not Found
     *       500:
     *         description: Internal server error
     */
    static GetById = async (req: Request<{ id: number }, {}, {}>, res: Response) =>
    {
        try
        {
            const proyecto: Proyecto | null = await ProyectosRepository.ReadProyectoById(req.params.id);

            if (proyecto == null)
            {
                res.status(404).send("Not Found");

                return
            }

            const proyectoDTO = ToGETProyectoResponseDTOFromProyecto(proyecto);

            res.status(200).json(proyectoDTO);
        }
        catch (error)
        {
            res.status(500).json({ message: '💀 Internal server error. ' + error});
        }
    }

    /**
     * @openapi
     * /api/proyectos/{id}:
     *   put:
     *     summary: Editar proyecto por Id
     *     tags: [Proyectos]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *               description:
     *                 type: string
     *               career:
     *                 type: string
     *               studentId:
     *                 type: number
     *             example:
     *               title: "string"
     *               description: "string"
     *               career: "string"
     *               studentId: 1
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: Id
     *     responses:
     *       200:
     *         description: GETProyectoResponseDTO
     *       404:
     *         description: Not Found
     *       500:
     *         description: Internal server error
     */
    static Update = async (req: Request<{ id: number }, {}, PUTProyectoRequestDTO>, res: Response) =>
    {
        try
        {
            const proyectoEditado: Proyecto | null = await ProyectosRepository.UpdateProyectoById(req.params.id, req.body);

            if (proyectoEditado == null)
            {
                res.status(404).send("Not Found");

                return
            }

            const proyectoEditadoDTO = ToGETProyectoResponseDTOFromProyecto(proyectoEditado);

            res.status(200).json(proyectoEditadoDTO);
        }
        catch (error)
        {
            res.status(500).json({ message: '💀 Internal server error. ' + error});
        }
    }

    /**
     * @openapi
     * /api/proyectos/{id}:
     *   delete:
     *     summary: Eliminar proyecto por Id
     *     tags: [Proyectos]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: Id
     *     responses:
     *       204:
     *         description: No content
     *       404:
     *         description: Not Found
     *       500:
     *         description: Internal server error
     */
    static Delete = async (req: Request<{ id: number }, {}, {}>, res: Response) =>
    {
        try
        {
            const eliminado = await ProyectosRepository.DeleteProyectoById(req.params.id);

            if (eliminado)
            {
                res.sendStatus(204);
            }
            else
            {
                res.status(404).send("Not Found");
            }
        }
        catch (error)
        {
            res.status(500).json({ message: '💀 Internal server error. ' + error});
        }
    }
}