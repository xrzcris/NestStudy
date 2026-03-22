import { Router } from "express";
import { ProyectosController } from "../controllers/ProyectosController";

const proyectosRoutes: Router = Router();

proyectosRoutes.post("", ProyectosController.Create);
proyectosRoutes.get("", ProyectosController.GetAll);
proyectosRoutes.get("/:id", ProyectosController.GetById);
proyectosRoutes.put("/:id", ProyectosController.Update);
proyectosRoutes.delete("/:id", ProyectosController.Delete);

export default proyectosRoutes;