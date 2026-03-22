import { Router } from "express";
import { ProyectosController } from "../controllers/ProyectosController";
import { TokenService } from "../service/TokenService";

const proyectosRoutes: Router = Router();

proyectosRoutes.post("", TokenService.VerifyToken, ProyectosController.Create);
proyectosRoutes.get("", ProyectosController.GetAll);
proyectosRoutes.get("/:id", ProyectosController.GetById);
proyectosRoutes.put("/:id", TokenService.VerifyToken, ProyectosController.Update);
proyectosRoutes.delete("/:id", TokenService.VerifyToken, ProyectosController.Delete);

export default proyectosRoutes;