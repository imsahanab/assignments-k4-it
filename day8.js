const { parentPort } = require("worker_threads");

let sum = 0;

// Heavy 
for (let i = 0; i < 1000000000; i++) {
  sum += i;
}

// Send result back to main thread
parentPort.postMessage(sum);
