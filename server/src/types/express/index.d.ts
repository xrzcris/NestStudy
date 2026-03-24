import { GETEstudianteResponseDTO } from "../EstudiantesTypes";

declare global {
    namespace Express {
        interface Request {
            user?: GETEstudianteResponseDTO
        }
    }
}