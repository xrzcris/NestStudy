import jwt from 'jsonwebtoken';
import { Estudiante, GETEstudianteResponseDTO } from '../types/EstudiantesTypes';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { NextFunction } from 'express';

// Load environment variables
dotenv.config();

// TokenService.ts
export class TokenService
{
    static CreateToken = async (estudiante: Estudiante): Promise<string> =>
    {
        const token = jwt.sign(
            {
                id: estudiante.id,
                name: estudiante.nombre,
                email: estudiante.email,
                career: estudiante.carrera,
                createdAt: estudiante.creado_en
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: '7d'
            }
        );

        return token;
    }

    static VerifyToken = (req: Request, res: Response, next: NextFunction): void =>
    {
        const authHeader: string | undefined = req.headers['authorization'];

        const token: string | undefined = authHeader && authHeader.split(' ')[1];

        if (!token)
        {
            res.status(401).send('Acceso denegado. Token requerido.');

            return
        }

        try
        {
            const data = jwt.verify(token, process.env.JWT_SECRET!) as GETEstudianteResponseDTO;

            req.user = data;

            next();
        }
        catch (error)
        {
            res.status(403).json({ mensaje: 'Token invalido o expirado.' });

            return
        }
    }
}