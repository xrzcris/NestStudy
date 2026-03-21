import mysql from 'mysql2';
import dotenv from 'dotenv';
import { Estudiante, GETEstudianteResponseDTO, POSTEstudianteRequestDTO } from '../types/EstudiantesTypes';

// Load environment variables
dotenv.config();

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
    host: process.env.DB_HOST!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    port: Number(process.env.DB_PORT),
});

// Use Promise-based pool queries (for async/await support)
const promisePool = pool.promise();

// EstudianteRepository.ts
export class EstudianteRepository
{
    static async createEstudiante(estudianteDTO: POSTEstudianteRequestDTO): Promise<GETEstudianteResponseDTO | null>
    {
        const [result] = await promisePool.query('INSERT INTO estudiantes (nombre, email, password, carrera) VALUES (?, ?, ?, ?)', [estudianteDTO.name, estudianteDTO.email, "CONTRASEÑA TEMPORAL", estudianteDTO.career]);

        const insertId = (result as mysql.ResultSetHeader).insertId;

        const [rows] = await promisePool.query<mysql.RowDataPacket[]>('SELECT * FROM estudiantes WHERE id = ?', [insertId]);

        const estudiantes: Estudiante[] = rows.map((rows) => rows as Estudiante);

        if (estudiantes[0] == null)
        {
            return null;
        }

        const estudianteCreado: GETEstudianteResponseDTO =
        {
            id: estudiantes[0].id,
            name: estudiantes[0].nombre,
            email: estudiantes[0].email,
            career: estudiantes[0].carrera,
            createdAt: estudiantes[0].creado_en,
        }

        return estudianteCreado;
    }

    static async getEstudianteById(id: number): Promise<GETEstudianteResponseDTO | null>
    {
        const [rows] = await promisePool.query<mysql.RowDataPacket[]>('SELECT * FROM estudiantes WHERE id = ?', [id]);

        const estudiantes: Estudiante[] = rows.map((rows) => rows as Estudiante);

        if (estudiantes[0] == null)
        {
            return null;
        }

        const estudianteDTO: GETEstudianteResponseDTO =
        {
            id: estudiantes[0].id,
            name: estudiantes[0].nombre,
            email: estudiantes[0].email,
            career: estudiantes[0].carrera,
            createdAt: estudiantes[0].creado_en,
        }

        return estudianteDTO;
    }
}