// api/index.js
const express = require("express");
const bodyParser = require("body-parser");
const { bulkSubmit } = require("../src/talentaService");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello from Talenta Submission 🚀");
});

app.post("/timesheet", async (req, res) => {
  try {
    const {
      fromDate,
      toDate,
      startTime,
      endTime,
      taskId,
      holidays,
      annualLeave,
    } = req.body;

    const cookie = req.headers["cookie"]; // required for Talenta API
    if (!cookie) {
      return res.status(400).json({ error: "Missing Cookie in headers" });
    }

    if (!fromDate || !toDate) {
      return res
        .status(400)
        .json({ error: "fromDate and toDate are required" });
    }

    const results = await bulkSubmit({
      fromDate,
      toDate,
      startTime: startTime || "09:00:00",
      endTime: endTime || "17:00:00",
      taskId,
      holidays: holidays || [],
      annualLeave: annualLeave || [],
      cookie,
    });

    res.json({ success: true, results });
  } catch (err) {
    console.error("Error in /timesheet:", err);
    res.status(500).json({ error: err.message });
  }
});

// Export handler for Vercel
module.exports = app;
