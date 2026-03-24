import { Request, Response } from 'express';
import { Colaboracion, POSTColaboracionRequestDTO, PUTColaboracionRequestDTO } from '../types/ColaboracionesTypes';
import { ColaboracionesRepository } from '../repository/ColaboracionesRepository';
import { ToGETColaboracionResponseDTOFromColaboracion } from '../mappers/ColaboracionesMappers';

/**
 * @openapi
 * tags:
 *   name: Colaboraciones
 *   description: Todo lo relacionado con colaboraciones, tambien conocidas como comentarios
 */
export class ColaboracionesController
{
    /**
     * @openapi
     * /api/colaboraciones:
     *   post:
     *     summary: Crear una colaboración
     *     security:
     *       - bearerAuth: []
     *     tags: [Colaboraciones]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               content:
     *                 type: string
     *               projectId:
     *                 type: number
     *               studentId:
     *                 type: number
     *             example:
     *               content: "string"
     *               projectId: 1
     *               studentId: 1
     *     responses:
     *       201:
     *         description: GETColaboracionResponseDTO
     *       401:
     *         description: Acceso denegado. Token requerido.
     *       500:
     *         description: Internal server error
     */
    static Create = async (req: Request<{}, {}, POSTColaboracionRequestDTO>, res: Response) =>
    {
        try
        {
            const nuevaColaboracion: Colaboracion | null = await ColaboracionesRepository.CreateColaboracion(req.body);

            res.status(201).json(ToGETColaboracionResponseDTOFromColaboracion(nuevaColaboracion!));
        }
        catch (error)
        {
            res.status(500).json({ message: '💀 Internal server error. ' + error});
        }
    }

    /**
     * @openapi
     * /api/colaboraciones:
     *   get:
     *     summary: Obtener todas las colaboraciones
     *     tags: [Colaboraciones]
     *     responses:
     *       200:
     *         description: GETColaboracionResponseDTO
     *       500:
     *         description: Internal server error
     */
    static GetAll = async (req: Request, res: Response) =>
    {
        try
        {
            const colaboraciones: Colaboracion[] | null = await ColaboracionesRepository.ReadAllColaboraciones();

            if (colaboraciones == null)
            {
                res.status(200).json([]);

                return
            }

            res.status(200).json(colaboraciones.map(ToGETColaboracionResponseDTOFromColaboracion));
        }
        catch (error)
        {
            res.status(500).json({ message: '💀 Internal server error. ' + error});
        }
    }

    /**
     * @openapi
     * /api/colaboraciones/{id}:
     *   get:
     *     summary: Obtener colaboración por Id
     *     tags: [Colaboraciones]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: Id
     *     responses:
     *       200:
     *         description: GETColaboracionResponseDTO
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
            const colaboracion: Colaboracion | null = await ColaboracionesRepository.ReadColaboracionById(id);

            if (colaboracion == null)
            {
                res.status(404).send("Not Found");

                return
            }

            res.status(200).json(ToGETColaboracionResponseDTOFromColaboracion(colaboracion));
        }
        catch (error)
        {
            res.status(500).json({ message: '💀 Internal server error. ' + error});
        }
    }

    /**
     * @openapi
     * /api/colaboraciones/{id}:
     *   put:
     *     summary: Editar colaboración por Id
     *     security:
     *       - bearerAuth: []
     *     tags: [Colaboraciones]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               content:
     *                 type: string
     *               projectId:
     *                 type: number
     *               studentId:
     *                 type: number
     *             example:
     *               content: "string"
     *               projectId: 1
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
     *         description: GETColaboracionResponseDTO
     *       400:
     *         description: Invalid ID format
     *       401:
     *         description: Acceso denegado. Token requerido.
     *       404:
     *         description: Not Found
     *       500:
     *         description: Internal server error
     */
    static Update = async (req: Request<{ id: string }, {}, PUTColaboracionRequestDTO>, res: Response) =>
    {
        const id: number = parseInt(req.params.id, 10);

        if (isNaN(id))
        {
            return res.status(400).send("Invalid ID format");
        }

        try
        {
            const colaboracionEditada: Colaboracion | null = await ColaboracionesRepository.UpdateColaboracionById(id, req.body);

            if (colaboracionEditada == null)
            {
                res.status(404).send("Not Found");

                return
            }

            res.status(200).json(ToGETColaboracionResponseDTOFromColaboracion(colaboracionEditada));
        }
        catch (error)
        {
            res.status(500).json({ message: '💀 Internal server error. ' + error});
        }
    }

    /**
     * @openapi
     * /api/colaboraciones/{id}:
     *   delete:
     *     summary: Eliminar colaboración por Id
     *     security:
     *       - bearerAuth: []
     *     tags: [Colaboraciones]
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
            const eliminado: boolean = await ColaboracionesRepository.DeleteColaboracionById(id);

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