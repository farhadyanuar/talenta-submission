const express = require("express");
const TalentaService = require("./services/talentaService");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Talenta Service
 *   description: Endpoints for submitting bulk Talenta tasks
 */

/**
 * @swagger
 * /bulkSubmit:
 *   post:
 *     tags: [Talenta Service]
 *     summary: Submit timesheet entries to Talenta in bulk
 *     description: Submits tasks to Talenta between given dates (skips weekends).
 */
router.post("/bulkSubmit", async (req, res) => {
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
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
