// /api/swagger.js
import swaggerJsdoc from "swagger-jsdoc";

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
  apis: ["./api/*.js"], // scan for @swagger comments
};

const specs = swaggerJsdoc(options);

export default function handler(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(specs);
}
