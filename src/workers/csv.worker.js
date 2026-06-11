const { parentPort, workerData } = require("worker_threads");
const fs = require("fs");
const csv = require("csv-parser");

const results = [];
let rowCount = 0;
const errors = [];

fs.createReadStream(workerData.filePath)
  .pipe(
    csv({
      mapHeaders: ({ header }) => header.trim().toLowerCase(),
      mapValues: ({ value }) => value.trim(),
    })
  )
  .on("data", (data) => {
    rowCount++;
    if (!data.name) {
      errors.push(`Row ${rowCount}: missing required field 'name'`);
      return;
    }
    results.push({
      name: data.name || "",
      role: data.role || "",
      department: data.department || "",
      salary: data.salary ? parseFloat(data.salary) : 0,
      email: data.email ? data.email.toLowerCase() : "",
    });
  })
  .on("end", () => {
    parentPort.postMessage({ success: true, data: results, skipped: errors });
  })
  .on("error", (err) => {
    parentPort.postMessage({ success: false, error: err.message });
  });
