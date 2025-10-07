const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
require("dotenv").config();

const talentaRoutes = require("./api/talenta");

const app = express();
app.use(express.json());

app.use("/", talentaRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send("🚀 Talenta Submitter API is running. Visit /docs for Swagger UI.");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at ${process.env.host}:${port}`);
  console.log(`Swagger UI at ${process.env.host}:${port}/docs`);
});
