const express = require("express");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const path = require("path");
const talentaRoutes = require("./talenta");

const app = express();
app.use(express.json());

// ✅ Load Swagger JSON safely
const swaggerPath = path.join(__dirname, "../swagger.json");
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, "utf8"));

// ✅ Serve Swagger UI correctly on Vercel
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    explorer: true,
    customCssUrl: "https://unpkg.com/swagger-ui-dist/swagger-ui.css",
    customJs: "https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js",
    customJs2:
      "https://unpkg.com/swagger-ui-dist/swagger-ui-standalone-preset.js",
  })
);

// ✅ Redirect `/` → `/api/docs`
app.get("/", (req, res) => res.redirect("/api/docs"));

// ✅ Talenta routes
app.use("/api/talenta", talentaRoutes);

module.exports = app;
