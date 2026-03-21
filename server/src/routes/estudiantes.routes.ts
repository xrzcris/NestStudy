import { Router } from "express";
import { EstudianteController } from "../controllers/EstudiantesController";

const estudiantesRoutes: Router = Router();

estudiantesRoutes.post("/", EstudianteController.createEstudiante);
estudiantesRoutes.get("/:id", EstudianteController.GetEstudianteById);

export default estudiantesRoutes;