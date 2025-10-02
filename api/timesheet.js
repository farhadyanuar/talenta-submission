// /api/timesheet.js
const { bulkSubmit } = require("../src/talentaService");

/**
 * @swagger
 * /timesheet:
 *   post:
 *     summary: Submit bulk timesheets
 *     description: Submit multiple timesheets to Talenta using a session cookie.
 *     tags:
 *       - Timesheet
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
 *                 format: date
 *                 example: "2025-10-01"
 *               toDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-10-15"
 *               taskId:
 *                 type: integer
 *                 example: 123456
 *               startTime:
 *                 type: string
 *                 example: "09:00:00"
 *               endTime:
 *                 type: string
 *                 example: "17:00:00"
 *               holidays:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["2025-10-02"]
 *               annualLeave:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["2025-10-05"]
 *     responses:
 *       200:
 *         description: Timesheets submitted
 *       400:
 *         description: Bad request (missing params)
 *       500:
 *         description: Server error
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
    res.status(500).json({ error: err.message });
  }
}
