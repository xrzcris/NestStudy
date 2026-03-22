import { Router } from "express";
import { ColaboracionesController } from "../controllers/ColaboracionesController";
import { TokenService } from "../service/TokenService";

const colaboracionesRoutes: Router = Router();

colaboracionesRoutes.post("", TokenService.VerifyToken, ColaboracionesController.Create);
colaboracionesRoutes.get("", ColaboracionesController.GetAll);
colaboracionesRoutes.get("/:id", ColaboracionesController.GetById);
colaboracionesRoutes.put("/:id", TokenService.VerifyToken, ColaboracionesController.Update);
colaboracionesRoutes.delete("/:id", TokenService.VerifyToken, ColaboracionesController.Delete);

export default colaboracionesRoutes;