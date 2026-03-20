import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";
import userRoutes from "./routes/user.routes";

const app = express();
app.use(express.json());

// Rutas
app.use("/api/test", userRoutes);

// SwaggerUI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = 3000;
app.listen(PORT, () =>
{
    console.log(`Server running on http://localhost:${PORT} ☝️🤓`);
    console.log(`SwaggerUI available at http://localhost:${PORT}/docs`);
});