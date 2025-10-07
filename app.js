const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
require("dotenv").config();

const talentaRoutes = require("./api/talenta");

const app = express();
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.redirect("/api/docs");
});

app.use("/talenta", talentaRoutes);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at ${process.env.host}:${port}`);
  console.log(`Swagger UI at ${process.env.host}:${port}/docs`);
});
