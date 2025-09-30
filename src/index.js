const express = require("express");
const bodyParser = require("body-parser");
const { bulkSubmit } = require("./talentaService");

const app = express();
app.use(bodyParser.json());

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
    const cookie = req.headers["cookie"]; // take from request header

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

    res.json({ results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
