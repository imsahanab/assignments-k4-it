// WORKER THREADS

// Worker thread allows us to run CPU-heavy tasks by multiple threads in a separate thread without blocking the main thread.

// Real-life example:
// we are doing billing in a shop.If one customer asks  to count 10,000 items we give that work to an assistant. we continue serving other customers.

// Example:
const { Worker } = require("worker_threads");
// Creating a worker thread
const worker = new Worker("./worker.js");

worker.on("message", (msg) => {
  console.log("Result from worker:", msg);
});

// worker.js

const { parentPort } = require("worker_threads");
let sum = 0;
for (let i = 0; i < 1000000; i++) {
  sum += i;
}

parentPort.postMessage(sum);

// MEMORY LEAK = Memory is allocated but never released.
// Real life example that i read through online sources availabl
// we keep throwing waste inside a room but never clean it.
// Eventually the room becomes full. Memory Leak happens when memory is allocated
// but not released, causing memory usage to grow continuously.

const users = [];
setInterval(() => {
  users.push(new Array(100000).fill("data"));
}, 1000);

// Every second memory increases.
// Memory is never cleared.

let cache = [];
setInterval(() => {
  cache = []; // clears the old data
}, 5000);


// OOP CONCEPTS
// 1. ENCAPSULATION--binding data and method together and its main duty is to hide internal logic only by using getters and 
//setter helper methods we can access the datamembers.

// Real-life example:
// ATM machine hides internal banking logic.

class bankAccount {
  #balance = 0;

  deposit(amount) {
    this.#balance += amount;
  }
  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount();

account.deposit(1000);

console.log(account.getBalance());

// 2. INHERITANCE

// What is Inheritance?
// Child class can use properties and methods of parent classusing extends keyword.

// Real-life example:
// Car is a Vehicle.
// Bike is a Vehicle.

class Vehicle {
  start() {
    console.log("Vehicle Started");
  }
}

class Car extends Vehicle {}
const car = new Car();
car.start();


// 3. POLYMORPHISM

// What is Polymorphism?
// Same method name, different behavior. Same power button works differently on TV and Mobile. and in below eg
//there are different animals sounds differently but extends animals category.
cass Animal {
  sound() {
    console.log("Animal Sound");
  }
}

class Dog extends Animal {//child 1
  sound() {
    console.log("Bark");
  }
}

class Cat extends Animal {//child 2
  sound() {
    console.log("Meow");
  }
}

new Dog().sound(); //op->bark
new Cat().sound();//op-->meow

//(i.e) Polymorphism means one method can have different implementations in different classes.

// 4. ABSTRACTION
// Hide complex implementation details and show only necessary functionality.
//Abstraction hides internal complexity and exposes only the required functionality.
// we drive a car using steering and pedals.
// we don't need to know engine internals.

class CarExample {
  start() {
    this.#checkEngine();
    console.log("Car Started");
  }

  #checkEngine() {
    console.log("Engine Checked");
  }
}

const myCar = new CarExample();

myCar.start();


