const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const talentaRoutes = require("./talenta");

const app = express();
app.use(express.json());

// Swagger UI route
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Redirect /api → /api/docs
app.get("/api", (req, res) => {
  res.redirect("/api/docs");
});

// Talenta routes
app.use("/api/talenta", talentaRoutes);

// Export Express app as a Vercel function
module.exports = app;
