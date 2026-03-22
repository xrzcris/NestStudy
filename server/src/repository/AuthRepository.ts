import mysql from 'mysql2';
import { pool } from "../db/connection";
import { Estudiante, POSTEstudianteRequestDTO, PUTEstudianteRequestDTO } from '../types/EstudiantesTypes';
import bcrypt from 'bcrypt';

// Use Promise-based pool queries (for async/await support)
const promisePool = pool.promise();

// AuthRepository.ts
export class AuthRepository
{
    static CreateEstudiante = async (estudianteDTO: POSTEstudianteRequestDTO): Promise<Estudiante | null> =>
    {
        const hash = await bcrypt.hash(estudianteDTO.password, 10);

        const [result] = await promisePool.query<mysql.ResultSetHeader>('INSERT INTO estudiantes (nombre, email, password, carrera) VALUES (?, ?, ?, ?)', [estudianteDTO.name, estudianteDTO.email, hash, estudianteDTO.career]);

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

    static ReadEstudianteByEmail = async (email: string): Promise<Estudiante | null> =>
    {
        const [rows] = await promisePool.query<mysql.RowDataPacket[]>('SELECT * FROM estudiantes WHERE email = ?;', [email]);

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