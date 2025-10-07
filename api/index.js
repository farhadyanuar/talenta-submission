const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const talentaRoutes = require("./talenta");

const app = express();
app.use(express.json());

// Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/talenta", talentaRoutes);

// Root
app.get("/", (req, res) => {
  res.redirect("/api/docs");
});

module.exports = app;
