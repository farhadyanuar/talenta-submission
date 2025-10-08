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
 * /bulk-submit:
 *   post:
 *     tags: [Talenta Service]
 *     summary: Submit timesheet entries to Talenta in bulk
 *     description: Submits tasks to Talenta between given dates (skips weekends).
 */
router.post("/bulk-submit", async (req, res) => {
  try {
    const {
      fromDate,
      toDate,
      startTime = "09:00:00",
      endTime = "17:00:00",
      taskId,
      activity = "",
      holidays = [],
      annualLeave = [],
    } = req.body;

    const cookie = req.headers["token"];

    if (!cookie)
      return res.status(400).json({ error: "Missing Token in headers" });
    if (!fromDate || !toDate)
      return res
        .status(400)
        .json({ error: "fromDate and toDate are required" });

    const results = await TalentaService.bulkSubmit({
      fromDate,
      toDate,
      startTime,
      endTime,
      activity,
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

/**
 * @swagger
 * tags:
 *   name: Talenta Service
 *   description: Endpoints for get task list
 */

/**
 * @swagger
 * /get-task-list:
 *   get:
 *     tags: [Talenta Service]
 *     summary: Get Talenta Task List
 *     description: Retrieves the list of tasks from Talenta.
 */
router.get("/get-task-list", async (req, res) => {
  try {
    const cookie = req.headers["token"];
    if (!cookie)
      return res.status(400).json({ error: "Missing Token in headers" });
    const result = await TalentaService.getTaskList(cookie);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
