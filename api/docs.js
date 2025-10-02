// /api/docs.js
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import express from "express";

// Define Swagger config
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Talenta Timesheet Submission API",
      version: "1.0.0",
      description: "Submit bulk timesheets to Talenta using cookies.",
    },
    servers: [
      { url: "https://talenta-submission-farhad-yanuars-projects.vercel.app" },
    ],
  },
  apis: ["./api/*.js"], // pick up docs from timesheet.js
};

const specs = swaggerJsdoc(options);

// Wrap in an Express app since Vercel runs API routes per file
const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

export default app;
