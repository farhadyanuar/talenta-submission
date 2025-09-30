// /api/timesheet.js
const { bulkSubmit } = require("../src/talentaService");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

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

    const cookie = req.headers["cookie"];
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

    res.status(200).json({ success: true, results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
