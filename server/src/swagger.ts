import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NestStudy Backend",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"], // path to route files
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;