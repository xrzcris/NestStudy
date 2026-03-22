import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { TokenService } from "../service/TokenService";

const estudiantesRoutes: Router = Router();

estudiantesRoutes.post("/registro", AuthController.Registro);
estudiantesRoutes.post("/login", AuthController.Login);
estudiantesRoutes.get("/", AuthController.GetAll);
estudiantesRoutes.get("/:id", AuthController.GetById);
estudiantesRoutes.put("/:id", AuthController.Update);
estudiantesRoutes.delete("/:id", TokenService.VerifyToken, AuthController.Delete);

export default estudiantesRoutes;