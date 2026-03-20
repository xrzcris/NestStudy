import { Router } from "express";
import { createTest, deleteTestById, getTest, getTestById, updateTestById } from "../controllers/testController";

const router = Router();

// Mapea la ruta a la función del controlador
router.get("/", getTest);

router.get("/:id", getTestById);

router.post("/", createTest);

router.put("/:id", updateTestById);

router.delete("/:id", deleteTestById);

export default router;