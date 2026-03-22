import { Router } from "express";
import { EstudiantesController } from "../controllers/EstudiantesController";

const estudiantesRoutes: Router = Router();

estudiantesRoutes.post("/", EstudiantesController.Create);
estudiantesRoutes.get("/", EstudiantesController.GetAll);
estudiantesRoutes.get("/:id", EstudiantesController.GetById);
estudiantesRoutes.put("/:id", EstudiantesController.Update);
estudiantesRoutes.delete("/:id", EstudiantesController.Delete);

export default estudiantesRoutes;