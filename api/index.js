const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const TalentaService = require("../services/talentaService");

const app = express();
app.use(express.json());

// Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Bulk Submit Route
app.post("/bulkSubmit", async (req, res) => {
  try {
    const {
      fromDate,
      toDate,
      startTime = "09:00:00",
      endTime = "17:00:00",
      taskId,
      holidays = [],
      annualLeave = [],
    } = req.body;

    const cookie = req.headers["cookie"];
    if (!cookie)
      return res.status(400).json({ error: "Missing Cookie in headers" });
    if (!fromDate || !toDate)
      return res
        .status(400)
        .json({ error: "fromDate and toDate are required" });

    const results = await TalentaService.bulkSubmit({
      fromDate,
      toDate,
      startTime,
      endTime,
      taskId,
      holidays,
      annualLeave,
      cookie,
    });

    res.json({ success: true, results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Root
app.get("/", (req, res) => {
  res.send("🚀 Talenta Submitter API is running. Visit /docs for Swagger UI.");
});

module.exports = app;
