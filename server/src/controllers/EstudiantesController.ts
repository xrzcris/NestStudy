import { EstudianteRepository } from "../repository/EstudiantesRepository";
import { POSTEstudianteRequestDTO } from "../types/EstudiantesTypes";
import { Request, Response } from 'express';

/**
 * @openapi
 * tags:
 *   name: Estudiantes
 *   description: Todo lo relacionado con estudiantes
 */
export class EstudianteController
{
    /**
     * @openapi
     * /api/estudiantes/:
     *   post:
     *     summary: Crear estudiante (contraseñas no implementadas aún)
     *     tags: [Estudiantes]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               email:
     *                 type: string
     *               career:
     *                 type: string
     *             example:
     *               name: "string"
     *               email: "string"
     *               career: "string"
     *     responses:
     *       201:
     *         description: GETEstudianteResponseDTO
     *       500:
     *         description: Internal server error
     */
    static createEstudiante = async (req: Request<{}, {}, POSTEstudianteRequestDTO>, res: Response) =>
    {
        const postEstudiante: POSTEstudianteRequestDTO =
        {
            name: req.body.name,
            email: req.body.email,
            career: req.body.career,
        }

        try
        {
            const estudiante = await EstudianteRepository.createEstudiante(postEstudiante);

            res.status(201).json(estudiante)
        }
        catch (error)
        {
            res.status(500).json({ message: 'Internal server error: ' + error});
        }
    }

    /**
     * @openapi
     * /api/estudiantes/{id}:
     *   get:
     *     summary: Obtener estudiante por Id
     *     tags: [Estudiantes]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: Id
     *     responses:
     *       200:
     *         description: GETEstudianteResponseDTO
     *       500:
     *         description: Internal server error
     */
    static GetEstudianteById = async (req: Request<{ id: number }, {}, {}>, res: Response) =>
    {
        try
        {
            const estudiante = await EstudianteRepository.getEstudianteById(req.params.id);

            res.status(200).json(estudiante)
        }
        catch (error)
        {
            res.status(500).json({ message: 'Internal server error: ' + error});
        }
    }
}