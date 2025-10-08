const axios = require("axios");
const dayjs = require("dayjs");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");

dayjs.extend(isSameOrBefore);

const taskIdPublicHoliday = 127597;
const taskIdAnnualLeave = 127673;
const TALENTA_URL = process.env.TALENTA_URL;

class talentaService {
  static async submitTalenta({
    date,
    startTime,
    endTime,
    taskId,
    cookie,
    activity = "",
  }) {
    const startDateTime = `${date} ${startTime}`;
    const endDateTime = `${date} ${endTime}`;

    try {
      const response = await axios.post(
        `${TALENTA_URL}/web/time-sheet/store`,
        {
          taskId,
          activity,
          start_time: startDateTime,
          end_time: endDateTime,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Cookie: cookie,
          },
        }
      );
      return { date, success: true, data: response.data };
    } catch (err) {
      console.log(err.response?.data || err.message);
      return { date, success: false, error: err.message };
    }
  }
  static async bulkSubmit({
    fromDate,
    toDate,
    startTime,
    endTime,
    taskId,
    activity = "",
    holidays = [],
    annualLeave = [],
    cookie,
  }) {
    let current = dayjs(fromDate);
    const end = dayjs(toDate);
    const results = [];

    while (current.isSameOrBefore(end)) {
      const dateStr = current.format("YYYY-MM-DD");
      const day = current.day();

      if (day === 0 || day === 6) {
        results.push({ date: dateStr, status: "skipped-weekend" });
      } else if (holidays.includes(dateStr)) {
        results.push(
          await this.submitTalenta({
            dateStr,
            startTime,
            endTime,
            taskIdPublicHoliday,
            cookie,
            activity,
          })
        );
      } else if (annualLeave.includes(dateStr)) {
        results.push(
          await this.submitTalenta({
            dateStr,
            startTime,
            endTime,
            taskIdAnnualLeave,
            cookie,
            activity,
          })
        );
      } else {
        results.push(
          await this.submitTalenta({
            date: dateStr,
            startTime,
            endTime,
            taskId,
            cookie,
            activity,
          })
        );
      }

      current = current.add(1, "day");
    }

    return results;
  }

  static async getTaskList(cookie) {
    try {
      const response = await axios.get(
        `${TALENTA_URL}/web/time-sheet/task-list`,
        {
          headers: {
            "Content-Type": "application/json",
            Cookie: cookie,
          },
        }
      );
      return response?.data?.data || [];
    } catch (err) {
      console.log(err.response?.data || err.message);
      return { success: false, error: err.message };
    }
  }
}

module.exports = talentaService;
