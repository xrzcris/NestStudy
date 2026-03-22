import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";
import dotenv from 'dotenv';
import estudiantesRoutes from "./routes/estudiantes.routes";
import proyectosRoutes from "./routes/proyectos.routes";
import colaboracionesRoutes from "./routes/colaboraciones.routes";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Rutas
app.use("/api/estudiantes", estudiantesRoutes);
app.use("/api/proyectos", proyectosRoutes);
app.use("/api/colaboraciones", colaboracionesRoutes);

// SwaggerUI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = 3000;
app.listen(PORT, () =>
{
    console.log(`Server running on http://localhost:${PORT} ☝️🤓`);
    console.log(`SwaggerUI available at http://localhost:${PORT}/docs`);
});