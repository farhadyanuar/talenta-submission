const express = require("express");
const fs = require("fs");
const path = require("path");
const talentaRoutes = require("./talenta");

const app = express();
app.use(express.json());

// Load swagger.json
const swaggerPath = path.join(__dirname, "../swagger.json");
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, "utf8"));

// ✅ Serve Swagger UI manually (no swagger-ui-express)
app.get("/api/docs", (req, res) => {
  const swaggerHtml = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Talenta Submitter API Docs</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css" />
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
    <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-standalone-preset.js"></script>
    <script>
      window.onload = () => {
        window.ui = SwaggerUIBundle({
          url: '/api/swagger.json',
          dom_id: '#swagger-ui',
          presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
          layout: "BaseLayout"
        });
      };
    </script>
  </body>
  </html>`;
  res.send(swaggerHtml);
});

// ✅ Serve swagger.json itself
app.get("/api/swagger.json", (req, res) => {
  res.json(swaggerDocument);
});

// ✅ Talenta API routes
app.use("/api/talenta", talentaRoutes);

// Redirect root → docs
app.get("/", (req, res) => res.redirect("/api/docs"));

module.exports = app;
