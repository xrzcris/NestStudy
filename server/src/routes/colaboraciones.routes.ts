import { Router } from "express";
import { ColaboracionesController } from "../controllers/ColaboracionesController";

const colaboracionesRoutes: Router = Router();

colaboracionesRoutes.post("", ColaboracionesController.Create);
colaboracionesRoutes.get("", ColaboracionesController.GetAll);
colaboracionesRoutes.get("/:id", ColaboracionesController.GetById);
colaboracionesRoutes.put("/:id", ColaboracionesController.Update);
colaboracionesRoutes.delete("/:id", ColaboracionesController.Delete);

export default colaboracionesRoutes;