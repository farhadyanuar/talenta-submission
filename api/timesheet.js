const { bulkSubmit } = require("../src/talentaService");

/**
 * @openapi
 * /api/timesheet:
 *   post:
 *     summary: Submit bulk timesheets
 *     description: Submit multiple timesheets to Talenta by providing a date range. Requires cookie headers from Talenta (PHPSESSID, _session_token, _csrf).
 *     tags:
 *       - Timesheet
 *     parameters:
 *       - in: header
 *         name: Cookie
 *         required: true
 *         schema:
 *           type: string
 *         description: Talenta cookies string (copy from browser devtools)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fromDate
 *               - toDate
 *               - taskId
 *             properties:
 *               fromDate:
 *                 type: string
 *                 example: "2025-10-01"
 *               toDate:
 *                 type: string
 *                 example: "2025-10-15"
 *               startTime:
 *                 type: string
 *                 example: "09:00:00"
 *               endTime:
 *                 type: string
 *                 example: "17:00:00"
 *               taskId:
 *                 type: number
 *                 example: 12345
 *               holidays:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["2025-10-10"]
 *               annualLeave:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["2025-10-12"]
 *     responses:
 *       200:
 *         description: Timesheet submission result
 */
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
