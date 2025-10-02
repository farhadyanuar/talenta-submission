// /api/docs.js
import { serveFiles, setup } from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import express from "express";

// Swagger spec
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Talenta Timesheet Submission API",
      version: "1.0.0",
      description: "Submit bulk timesheets to Talenta using cookies.",
    },
    servers: [
      {
        url: "https://talenta-submission-farhad-yanuars-projects.vercel.app/api",
      },
    ],
  },
  apis: ["./api/*.js"], // will read JSDoc comments in your routes
};

const specs = swaggerJsdoc(options);

// Create express app just for swagger
const app = express();
app.use("/", serveFiles(specs), setup(specs));

export default app;
