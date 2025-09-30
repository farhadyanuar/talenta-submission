const axios = require("axios");
const dayjs = require("dayjs");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");

dayjs.extend(isSameOrBefore);

const taskIdPublicHoliday = 127597;
const taskIdAnnualLeave = 127673;

async function submitTalenta(date, startTime, endTime, taskId, cookie) {
  const startDateTime = `${date} ${startTime}`;
  const endDateTime = `${date} ${endTime}`;

  try {
    const response = await axios.post(
      "https://hr.talenta.co/api/web/time-sheet/store",
      {
        task_id: taskId,
        activity: "",
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
    return { success: true, data: response.data };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

async function bulkSubmit({
  fromDate,
  toDate,
  startTime,
  endTime,
  taskId,
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
        await submitTalenta(
          dateStr,
          startTime,
          endTime,
          taskIdPublicHoliday,
          cookie
        )
      );
    } else if (annualLeave.includes(dateStr)) {
      results.push(
        await submitTalenta(
          dateStr,
          startTime,
          endTime,
          taskIdAnnualLeave,
          cookie
        )
      );
    } else {
      results.push(
        await submitTalenta(dateStr, startTime, endTime, taskId, cookie)
      );
    }
    current = current.add(1, "day");
  }

  return results;
}

module.exports = { submitTalenta, bulkSubmit };
