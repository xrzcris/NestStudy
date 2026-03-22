import mysql from 'mysql2';
import { pool } from "../db/connection";
import { POSTProyectoRequestDTO, Proyecto, PUTProyectoRequestDTO } from '../types/ProyectosTypes';

// Use Promise-based pool queries (for async/await support)
const promisePool = pool.promise();

// ProyectosRepository.ts
export class ProyectosRepository
{
    static CreateProyecto = async (proyectoDTO: POSTProyectoRequestDTO): Promise<Proyecto | null> =>
    {
        const [result] = await promisePool.query<mysql.ResultSetHeader>('INSERT INTO proyectos (titulo, descripcion, carrera, estudiante_id) VALUES (?, ?, ?, ?);', [proyectoDTO.title, proyectoDTO.description, proyectoDTO.career, proyectoDTO.studentId]);

        const nuevoProyecto: Proyecto | null = await this.ReadProyectoById(result.insertId);

        if (!nuevoProyecto)
        {
            return null
        }

        return nuevoProyecto;
    }

    static ReadAllProyectos = async (): Promise<Proyecto[] | null> =>
    {
        const [rows] = await promisePool.query<mysql.RowDataPacket[]>('SELECT * FROM proyectos;');

        const proyectos: Proyecto[] = rows.map((rows) => rows as Proyecto);

        if (proyectos[0] == null)
        {
            return null;
        }

        return proyectos;
    }

    static ReadProyectoById = async (id: number): Promise<Proyecto | null> =>
    {
        const [rows] = await promisePool.query<mysql.RowDataPacket[]>('SELECT * FROM proyectos WHERE id = ?;', [id]);

        const proyectos: Proyecto[] = rows.map((rows) => rows as Proyecto);

        if (proyectos[0] == null)
        {
            return null;
        }

        return proyectos[0];
    }

    static UpdateProyectoById = async (id: number, proyectoEditadoDTO: PUTProyectoRequestDTO): Promise<Proyecto | null> =>
    {
        const [result] = await promisePool.query<mysql.ResultSetHeader>('UPDATE proyectos SET titulo = ?, descripcion = ?, carrera = ?, estudiante_id = ? WHERE id = ?;', [proyectoEditadoDTO.title, proyectoEditadoDTO.description, proyectoEditadoDTO.career, proyectoEditadoDTO.studentId, id]);

        let proyectoEditado: Proyecto | null = null;

        if (!result.insertId)
        {
            proyectoEditado = await this.ReadProyectoById(id);
        }

        if (proyectoEditado == null)
        {
            return null;
        }

        return proyectoEditado;
    }

    static DeleteProyectoById = async (id: number): Promise<boolean> =>
    {
        const [result] = await promisePool.query<mysql.ResultSetHeader>('DELETE FROM proyectos WHERE id = ?;', [id]);

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