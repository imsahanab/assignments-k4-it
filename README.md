# Day 1 - Node.js Basics

 Topics Learned
 1. Streams
Used to read large files in small chunks.
Saves memory and loads data faster.
Example: Netflix, YouTube video streaming.

Events:

 `data` → Receives chunks
 `error` → Handles errors
 `end` → Reading completed

2. Event Loop

 Handles asynchronous operations in Node.js.
 Non-blocking execution.
 
console.log("Start");

fs.readFile("file.txt", "utf8", () => {
  console.log("File Read");
});

console.log("End");

Output:
Start
End
File Read

3. Lexical Scope
Inner function can access outer function variables.
 Outer function cannot access inner function variables.
function outer() {
  let msg = "Hello";

  function inner() {
    console.log(msg);
  }

  inner();
}
4. Promises & Event Loop Order

Execution Order:

1. Synchronous Code
2. process.nextTick()`
3. Promise (`.then()`)
4. setTimeout()
5. setImmediate()

 5. Error Handling

Callback error

if (err) {
  console.log(err);
}
Promise: 
promise.catch(err => console.log(err));

Async/Await

try {
  await task();
} catch(err) {
  console.log(err);
}
//
topics covered

✔ Streams

✔ Event Loop

✔ Lexical Scope

✔ Promises

✔ Error Handling

Day1 Goal: Learned how Node.js handles files, asynchronous tasks, scopes, promises, and errors. 🚀
