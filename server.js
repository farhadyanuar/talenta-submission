const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Talenta Submiter API",
      version: "1.0.0",
    },
    servers: [{ url: "http://localhost:3000/api" }],
  },
  apis: ["./api/**/*.js"], // same routes you’ll use
};

const swaggerSpec = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Talenta Submiter API" });
});

app.listen(3000, () => {
  console.log("Running on http://localhost:3000");
  console.log("Swagger at http://localhost:3000/api-docs");
});
