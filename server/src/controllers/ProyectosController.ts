import { ToGETOneProyectoResponseDTOFromProyecto, ToGETProyectoResponseDTOFromProyecto } from "../mappers/ProyectosMappers";
import { ColaboracionesRepository } from "../repository/ColaboracionesRepository";
import { ProyectosRepository } from "../repository/ProyectosRepository";
import { Colaboracion } from "../types/ColaboracionesTypes";
import { POSTProyectoRequestDTO, Proyecto, PUTProyectoRequestDTO } from "../types/ProyectosTypes";
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
     *     security:
     *       - bearerAuth: []
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
     *       401:
     *         description: Acceso denegado. Token requerido.
     *       500:
     *         description: Internal server error
     */
    static Create = async (req: Request<{}, {}, POSTProyectoRequestDTO>, res: Response) =>
    {
        try
        {
            const nuevoProyecto: Proyecto | null = await ProyectosRepository.CreateProyecto(req.body);

            res.status(201).json(ToGETProyectoResponseDTOFromProyecto(nuevoProyecto!));
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

            res.status(200).json(proyectos.map(ToGETProyectoResponseDTOFromProyecto));
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
     *         description: GETOneProyectoResponseDTO
     *       400:
     *         description: Invalid ID format
     *       404:
     *         description: Not Found
     *       500:
     *         description: Internal server error
     */
    static GetById = async (req: Request<{ id: string }, {}, {}>, res: Response) =>
    {
        const id: number = parseInt(req.params.id, 10);

        if (isNaN(id))
        {
            return res.status(400).send("Invalid ID format");
        }
        
        try
        {
            const proyecto: Proyecto | null = await ProyectosRepository.ReadProyectoById(id);

            if (proyecto == null)
            {
                res.status(404).send("Not Found");

                return
            }

            const colaboraciones: Colaboracion[] | null = await ColaboracionesRepository.ReadColaboracionesByProyectoId(id);

            res.status(200).json(ToGETOneProyectoResponseDTOFromProyecto(proyecto, colaboraciones));
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
     *     security:
     *       - bearerAuth: []
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
     *       400:
     *         description: Invalid ID format
     *       401:
     *         description: Acceso denegado. Token requerido.
     *       404:
     *         description: Not Found
     *       500:
     *         description: Internal server error
     */
    static Update = async (req: Request<{ id: string }, {}, PUTProyectoRequestDTO>, res: Response) =>
    {
        const id: number = parseInt(req.params.id, 10);

        if (isNaN(id))
        {
            return res.status(400).send("Invalid ID format");
        }

        try
        {
            const proyectoEditado: Proyecto | null = await ProyectosRepository.UpdateProyectoById(id, req.body);

            if (proyectoEditado == null)
            {
                res.status(404).send("Not Found");

                return
            }

            res.status(200).json(ToGETProyectoResponseDTOFromProyecto(proyectoEditado));
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
     *     security:
     *       - bearerAuth: []
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
     *       400:
     *         description: Invalid ID format
     *       401:
     *         description: Acceso denegado. Token requerido.
     *       404:
     *         description: Not Found
     *       500:
     *         description: Internal server error
     */
    static Delete = async (req: Request<{ id: string }, {}, {}>, res: Response) =>
    {
        const id: number = parseInt(req.params.id, 10);

        if (isNaN(id))
        {
            return res.status(400).send("Invalid ID format");
        }

        try
        {
            const eliminado: boolean = await ProyectosRepository.DeleteProyectoById(id);

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