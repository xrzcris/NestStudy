import mysql from 'mysql2';
import dotenv from 'dotenv';
import { Estudiante, POSTEstudianteRequestDTO, PUTEstudianteRequestDTO } from '../types/EstudiantesTypes';

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

// EstudiantesRepository.ts
export class EstudiantesRepository
{
    static CreateEstudiante = async (estudianteDTO: POSTEstudianteRequestDTO): Promise<Estudiante | null> =>
    {
        const [result] = await promisePool.query<mysql.ResultSetHeader>('INSERT INTO estudiantes (nombre, email, password, carrera) VALUES (?, ?, ?, ?)', [estudianteDTO.name, estudianteDTO.email, "CONTRASEÑA TEMPORAL", estudianteDTO.career]);

        const nuevoEstudiante: Estudiante | null = await this.ReadEstudianteById(result.insertId);

        if (!nuevoEstudiante)
        {
            return null;
        }

        return nuevoEstudiante;
    }

    static ReadAllEstudiantes = async (): Promise<Estudiante[] | null> =>
    {
        const [rows] = await promisePool.query<mysql.RowDataPacket[]>('SELECT * FROM estudiantes;');

        const estudiantes: Estudiante[] = rows.map((rows) => rows as Estudiante);

        if (estudiantes[0] == null)
        {
            return null;
        }

        return estudiantes;
    }

    static ReadEstudianteById = async (id: number): Promise<Estudiante | null> =>
    {
        const [rows] = await promisePool.query<mysql.RowDataPacket[]>('SELECT * FROM estudiantes WHERE id = ?;', [id]);

        const estudiantes: Estudiante[] = rows.map((rows) => rows as Estudiante);

        if (estudiantes[0] == null)
        {
            return null;
        }

        return estudiantes[0];
    }

    static UpdateEstudianteById = async (id: number, estudianteEditadoDTO: PUTEstudianteRequestDTO): Promise<Estudiante | null> =>
    {
        const [result] = await promisePool.query<mysql.ResultSetHeader>('UPDATE estudiantes SET nombre = ?, email = ?, carrera = ? WHERE id = ?;', [estudianteEditadoDTO.name, estudianteEditadoDTO.email, estudianteEditadoDTO.career, id]);

        let estudianteEditado: Estudiante | null = null;

        if (!result.insertId)
        {
            estudianteEditado = await this.ReadEstudianteById(id);
        }        

        if (estudianteEditado == null)
        {
            return null;
        }

        return estudianteEditado;
    }

    static DeleteEstudianteById = async (id: number): Promise<boolean> =>
    {
        const [result] = await promisePool.query<mysql.ResultSetHeader>('DELETE FROM estudiantes WHERE id = ?;', [id]);

        if (result.affectedRows === 0)
        {
            return false;
        }
        else
        {
            return true;
        }
    }
}