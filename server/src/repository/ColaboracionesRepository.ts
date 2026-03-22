import mysql from 'mysql2';
import dotenv from 'dotenv';
import { Colaboracion, POSTColaboracionRequestDTO, PUTColaboracionRequestDTO } from '../types/ColaboracionesTypes';

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

// ColaboracionesRepository.ts
export class ColaboracionesRepository
{
    static CreateColaboracion = async (colaboracionDTO: POSTColaboracionRequestDTO): Promise<Colaboracion | null> =>
    {
        const [result] = await promisePool.query<mysql.ResultSetHeader>('INSERT INTO colaboraciones (contenido, proyecto_id, estudiante_id) VALUES (?, ?, ?);', [colaboracionDTO.content, colaboracionDTO.projectId, colaboracionDTO.studentId]);

        const nuevaColaboracion: Colaboracion | null = await this.ReadColaboracionById(result.insertId);

        if (!nuevaColaboracion)
        {
            return null;
        }

        return nuevaColaboracion;
    }

    static ReadAllColaboraciones = async (): Promise<Colaboracion[] | null> =>
    {
        const [rows] = await promisePool.query<mysql.RowDataPacket[]>('SELECT * FROM colaboraciones;');

        const colaboraciones: Colaboracion[] = rows.map((rows) => rows as Colaboracion);

        if (colaboraciones[0] == null)
        {
            return null;
        }

        return colaboraciones;
    }

    static ReadColaboracionById = async (id: number): Promise<Colaboracion | null> =>
    {
        const [rows] = await promisePool.query<mysql.RowDataPacket[]>('SELECT * FROM colaboraciones WHERE id = ?;', [id]);

        const colaboraciones: Colaboracion[] = rows.map((rows) => rows as Colaboracion);

        if (colaboraciones[0] == null)
        {
            return null;
        }

        return colaboraciones[0];
    }

    static UpdateColaboracionById = async (id: number, colaboracionEditadaDTO: PUTColaboracionRequestDTO): Promise<Colaboracion | null> =>
    {
        const [result] = await promisePool.query<mysql.ResultSetHeader>('UPDATE colaboraciones SET contenido = ?, proyecto_id = ?, estudiante_id = ? WHERE id = ?;', [colaboracionEditadaDTO.content, colaboracionEditadaDTO.projectId, colaboracionEditadaDTO.studentId, id]);

        let colaboracionEditada: Colaboracion | null = null;

        if (!result.insertId)
        {
            colaboracionEditada = await this.ReadColaboracionById(id);
        }

        if (colaboracionEditada == null)
        {
            return null;
        }

        return colaboracionEditada;
    }

    static DeleteColaboracionById = async (id: number): Promise<boolean> =>
    {
        const [result] = await promisePool.query<mysql.ResultSetHeader>('DELETE FROM colaboraciones WHERE id = ?;', [id]);

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