import { ToGETEstudianteResponseDTOFromEstudiante } from "../mappers/EstudiantesMappers";
import { AuthRepository } from "../repository/AuthRepository";
import { Estudiante, GETEstudianteResponseDTO, POSTEstudianteRequestDTO, POSTLoginRequestDTO, PUTEstudianteRequestDTO, PUTPasswordRequestDTO } from "../types/EstudiantesTypes";
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { TokenService } from "../service/TokenService";

/**
 * @openapi
 * tags:
 *   name: Auth
 *   description: Todo lo relacionado con estudiantes
 */
export class AuthController
{
    /**
     * @openapi
     * /api/auth/registro:
     *   post:
     *     summary: Crear una cuenta
     *     tags: [Auth]
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
     *               password:
     *                 type: string
     *               career:
     *                 type: string
     *             example:
     *               name: "string"
     *               email: "string"
     *               password: "string"
     *               career: "string"
     *     responses:
     *       201:
     *         description: Token, GETEstudianteResponseDTO
     *       400:
     *         description: Todos los campos son obligatorios.
     *       409:
     *         description: El email ya está registrado.
     *       500:
     *         description: Internal server error
     */
    static Registro = async (req: Request<{}, {}, POSTEstudianteRequestDTO>, res: Response) =>
    {
        const { name, email, password, career } = req.body;

        if (!name || !email || !password || !career)
        {
            return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
        }

        try
        {
            const existe: Estudiante | null = await AuthRepository.ReadEstudianteByEmail(req.body.email);

            if (existe != null)
            {
                return res.status(409).json({ message: 'El email ya está registrado.' });
            }

            const nuevoEstudiante: Estudiante | null = await AuthRepository.CreateEstudiante(req.body);

            const token: string = await TokenService.CreateToken(nuevoEstudiante!);

            res.status(201).json({ token: token, GETEstudianteResponseDTO: ToGETEstudianteResponseDTOFromEstudiante(nuevoEstudiante!)});
        }
        catch (error)
        {
            res.status(500).json({ message: '💀 Internal server error: ' + error});
        }
    }

    /**
     * @openapi
     * /api/auth/login:
     *   post:
     *     summary: Iniciar sesion
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *             example:
     *               email: "string"
     *               password: "string"
     *     responses:
     *       201:
     *         description: Token, GETEstudianteResponseDTO
     *       400:
     *         description: Email y contraseña son obligatorios.
     *       409:
     *         description: Credenciales incorrectas.
     *       500:
     *         description: Internal server error
     */
    static Login = async (req: Request<{}, {}, POSTLoginRequestDTO>, res: Response) =>
    {
        const { email, password } = req.body;

        if (!email || !password)
        {
            return res.status(400).send("Email y contraseña son obligatorios.");
        }

        try
        {
            const estudiante: Estudiante | null = await AuthRepository.ReadEstudianteByEmail(req.body.email);

            if (estudiante == null)
            {
                return res.status(409).send("Credenciales incorrectas.");
            }

            const passwordValidation: boolean = await bcrypt.compare(req.body.password, estudiante.password);

            if (!passwordValidation)
            {
                return res.status(409).send("Credenciales incorrectas.");
            }

            const token: string = await TokenService.CreateToken(estudiante);

            res.status(200).json({ token: token, GETEstudianteResponseDTO: ToGETEstudianteResponseDTOFromEstudiante(estudiante)});
        }
        catch (error)
        {
            res.status(500).json({ message: '💀 Internal server error: ' + error});
        }
    }

    /**
     * @openapi
     * /api/auth:
     *   get:
     *     summary: Obtener todos los estudiantes
     *     tags: [Auth]
     *     responses:
     *       200:
     *         description: GETEstudianteResponseDTO
     *       500:
     *         description: Internal server error
     */
    static GetAll = async (req: Request, res: Response) =>
    {
        try
        {
            const estudiantes: Estudiante[] | null = await AuthRepository.ReadAllEstudiantes();

            if (estudiantes == null)
            {
                res.status(200).json([]);

                return
            }

            res.status(200).json(estudiantes.map(ToGETEstudianteResponseDTOFromEstudiante));
        }
        catch (error)
        {
            res.status(500).json({ message: '💀 Internal server error. ' + error});
        }
    }

    /**
     * @openapi
     * /api/auth/{id}:
     *   get:
     *     summary: Obtener estudiante por Id
     *     tags: [Auth]
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
     *       400:
     *         description: Invalid ID format
     *       404:
     *         description: Not Found
     *       500:
     *         description: Internal server error
     */
    static GetById = async (req: Request<{ id: string }, {}, {}>, res: Response) =>
    {
        const id: number = parseInt(req.params.id, 10); // Convert string to number

        if (isNaN(id))
        {
            return res.status(400).send("Invalid ID format");
        }

        try
        {
            const estudiante: Estudiante | null = await AuthRepository.ReadEstudianteById(id);

            if (estudiante == null)
            {
                res.status(404).send("Not Found");

                return
            }

            res.status(200).json(ToGETEstudianteResponseDTOFromEstudiante(estudiante));
        }
        catch (error)
        {
            res.status(500).json({ message: '💀 Internal server error. ' + error});
        }
    }

    /**
     * @openapi
     * /api/auth:
     *   put:
     *     summary: Editar estudiante (Usa el Id del estudiante en el token)
     *     security:
     *       - bearerAuth: []
     *     tags: [Auth]
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
     *       200:
     *         description: GETEstudianteResponseDTO
     *       400:
     *         description: Invalid ID format or JWT
     *       401:
     *         description: Acceso denegado. Token requerido.
     *       404:
     *         description: Not Found
     *       500:
     *         description: Internal server error
     */
    static Update = async (req: Request<{}, {}, PUTEstudianteRequestDTO>, res: Response) =>
    {
        if (req.user?.id == undefined)
        {
            return res.status(400).send("Invalid ID format or JWT");
        }

        try
        {
            const estudianteEditado: Estudiante | null = await AuthRepository.UpdateEstudianteById(req.user.id, req.body);

            if (estudianteEditado == null)
            {
                res.status(404).send("Not Found");

                return
            }

            res.status(200).json(ToGETEstudianteResponseDTOFromEstudiante(estudianteEditado));
        }
        catch (error)
        {
            res.status(500).json({ message: '💀 Internal server error. ' + error});
        }
    }

    /**
     * @openapi
     * /api/auth/password:
     *   put:
     *     summary: Cambiar contraseña (Usa el Id del estudiante en el token)
     *     security:
     *       - bearerAuth: []
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: password
     *             example:
     *               password: "string"
     *     responses:
     *       204:
     *         description: No content (Success)
     *       400:
     *         description: Invalid ID format or JWT | La contraseña es obligatoria.
     *       401:
     *         description: Acceso denegado. Token requerido.
     *       404:
     *         description: Not Found
     *       500:
     *         description: Internal server error
     */
    static UpdatePassword = async (req: Request<{}, {}, PUTPasswordRequestDTO>, res: Response) =>
    {
        const { password } = req.body;

        if (!password)
        {
            return res.status(400).json({ message: 'La contraseña es obligatoria.' });
        }

        if (req.user?.id == undefined)
        {
            return res.status(400).send("Invalid ID format or JWT");
        }

        try
        {
            const updateResult: boolean = await AuthRepository.UpdatePasswordById(req.user.id, password);

            if (updateResult == false)
            {
                res.status(404).send("Not Found");

                return
            }

            res.sendStatus(204);
        }
        catch (error)
        {
            res.status(500).json({ message: '💀 Internal server error. ' + error});
        }
    }

    /**
     * @openapi
     * /api/auth:
     *   delete:
     *     summary: Eliminar estudiante (Usa el Id del estudiante en el token)
     *     security:
     *       - bearerAuth: []
     *     tags: [Auth]
     *     responses:
     *       204:
     *         description: No content
     *       400:
     *         description: Invalid ID format or JWT
     *       401:
     *         description: Acceso denegado. Token requerido.
     *       404:
     *         description: Not Found
     *       500:
     *         description: Internal server error
     */
    static Delete = async (req: Request<{}, {}, {}>, res: Response) =>
    {
        try
        {
            if (req.user?.id == undefined)
            {
                return res.status(400).send("Invalid ID format or JWT");
            }

            const eliminado: boolean = await AuthRepository.DeleteEstudianteById(req.user.id);

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