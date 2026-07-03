// SOLID PRINCIPLES

// SOLID is a collection of 5 Object-Oriented Design principles.
// These principles help us write code that is:
// - Easy to understand
// - Easy to maintain
// - Easy to extend
// - Less dependent on other classes
// - Easier to test
//
// S - Single Responsibility Principle
// O - Open Closed Principle
// L - Liskov Substitution Principle
// I - Interface Segregation Principle
// D - Dependency Inversion Principle

// S - SINGLE RESPONSIBILITY PRINCIPLE (SRP)

// Definition:
//
// A class should have ONLY ONE reason to change.
//
// In simple words:
// One class = One responsibility.
//
// Wrong:
// UserService
// - Creates user
// - Sends email
// - Generates PDF
// - Saves logs
//
// If email logic changes,
// UserService changes.
//
// If PDF logic changes,
// UserService changes.
//
// Too many responsibilities.

// -----------------------
// Wrong Example
// -----------------------

class BadUserService {
  createUser() {
    console.log("User Created");
    this.sendEmail();
    this.saveLog();
  }

  sendEmail() {
    console.log("Email Sent");
  }

  saveLog() {
    console.log("Log Saved");
  }
}

// Problems:
// Multiple responsibilities
// Hard to maintain
// Hard to test

// -----------------------
// Correct Example
// -----------------------

class UserService {
  createUser() {
    console.log("User Created");
  }
}

class EmailService {
  sendEmail() {
    console.log("Email Sent");
  }
}

class LogService {
  saveLog() {
    console.log("Log Saved");
  }
}

// Now every class has one responsibility.

// NestJS Example:
//
// AuthService -> Login
// EmailService -> Send email
// NotificationService -> Push notifications
// PaymentService -> Payments

// Interview Answer:
//
// Every class should have only one responsibility
// and only one reason to change.


// O - OPEN CLOSED PRINCIPLE (OCP)

// Definition:
//
// Software entities should be
// OPEN for Extension
// CLOSED for Modification.
//
// Means:
//
// We should add new functionality
// WITHOUT changing existing code.

// -----------------------
// Wrong Example
// -----------------------

class PaymentService1 {

  pay(method: string) {

    if (method == "card") {
      console.log("Card Payment");
    }

    else if (method == "upi") {
      console.log("UPI Payment");
    }

    // Tomorrow PayPal comes

    else if (method == "paypal") {
      console.log("Paypal Payment");
    }

  }

}

// Every new payment method
// requires modifying this class.

// -----------------------
// Correct Example
// -----------------------

interface PaymentMethod {
  pay(): void;
}

class CardPayment implements PaymentMethod {
  pay() {
    console.log("Card Payment");
  }
}

class UpiPayment implements PaymentMethod {
  pay() {
    console.log("UPI Payment");
  }
}

class PaypalPayment implements PaymentMethod {
  pay() {
    console.log("Paypal Payment");
  }
}

class PaymentService {

  process(payment: PaymentMethod) {
    payment.pay();
  }

}

const payment = new PaymentService();

payment.process(new CardPayment());
payment.process(new UpiPayment());
payment.process(new PaypalPayment());

// Notice:
//
// PaymentService never changes.
// We simply create new classes.

// NestJS Example:
//
// Strategy Pattern
//
// JwtStrategy
// GoogleStrategy
// FacebookStrategy
//
// AuthService doesn't change.

// Interview Answer:
//
// Existing code should not be modified.
// Add new functionality by creating new classes.


// L - LISKOV SUBSTITUTION PRINCIPLE (LSP)

// Definition:
//
// Child class should be able to replace
// Parent class without breaking the program.

// Means:
//
// If class B extends class A,
// then class B should behave like class A.

// -----------------------
// Wrong Example
// -----------------------

class Bird {

  fly() {
    console.log("Flying");
  }

}

class Penguin extends Bird {

  fly() {
    throw new Error("Penguins cannot fly");
  }

}

// Somewhere

const bird: Bird = new Penguin();

// bird.fly(); // Crash

// Parent expected flying.
// Child broke that expectation.

// LSP violated.

// -----------------------
// Correct Example
// -----------------------

class Animal {}

class FlyingBird extends Animal {

  fly() {
    console.log("Flying");
  }

}

class Sparrow extends FlyingBird {}

class Penguin1 extends Animal {

  swim() {
    console.log("Swimming");
  }

}

// Penguin no longer pretends
// it can fly.

// NestJS Example:
//
// Base Repository
//
// UserRepository
// DoctorRepository
//
// Both should support all methods
// promised by BaseRepository.

// Interview Answer:
//
// Child class should never break
// parent class behavior.


// I - INTERFACE SEGREGATION PRINCIPLE (ISP)

// Definition:
//
// Clients should not depend on
// methods they don't use.
//
// Means:
//
// Instead of one huge interface,
// create small interfaces.

// -----------------------
// Wrong Example
// -----------------------

interface Worker {

  work(): void;

  eat(): void;

  sleep(): void;

}

class Robot implements Worker {

  work() {}

  eat() {
    throw new Error("Robot doesn't eat");
  }

  sleep() {
    throw new Error("Robot doesn't sleep");
  }

}

// Robot forced to implement
// unnecessary methods.

// -----------------------
// Correct Example
// -----------------------

interface Workable {

  work(): void;

}

interface Eatable {

  eat(): void;

}

interface Sleepable {

  sleep(): void;

}

class Human implements Workable, Eatable, Sleepable {

  work() {}

  eat() {}

  sleep() {}

}

class Robot1 implements Workable {

  work() {}

}

// NestJS Example:
//
// IUserRepository
//
// createUser()
//
// findUser()
//
// deleteUser()
//
//
//
// IEmailService
//
// sendEmail()
//
//
//
// INotificationService
//
// sendNotification()

// Instead of one huge interface.

// Interview Answer:
//
// Create multiple small interfaces
// instead of one large interface.


// D - DEPENDENCY INVERSION PRINCIPLE (DIP)

// Definition:
//
// High-level modules should not depend
// on low-level modules.
//
// Both should depend on abstractions.
//
// Means:
//
// Depend on Interface
// NOT on concrete class.

// -----------------------
// Wrong Example
// -----------------------

class MysqlDatabase {

  save() {
    console.log("Saved in MySQL");
  }

}

class UserService1 {

  database = new MysqlDatabase();

  createUser() {

    this.database.save();

  }

}

// Tomorrow MongoDB comes.
//
// Must edit UserService.

// -----------------------
// Correct Example
// -----------------------

interface Database {

  save(): void;

}

class MysqlDatabase1 implements Database {

  save() {
    console.log("Saved in MySQL");
  }

}

class MongoDatabase implements Database {

  save() {
    console.log("Saved in MongoDB");
  }

}

class UserService2 {

  constructor(private database: Database) {}

  createUser() {

    this.database.save();

  }

}

const mysql = new MysqlDatabase1();
const mongo = new MongoDatabase();

const user1 = new UserService2(mysql);
const user2 = new UserService2(mongo);

user1.createUser();
user2.createUser();

// UserService never changes.

// NestJS Example:
//
// constructor(
//   private readonly userRepository: IUserRepository,
// ) {}
//
// Instead of:
//
// constructor(
//   private readonly couchbaseRepository: CouchbaseRepository,
// ) {}
//
// NestJS Dependency Injection
// follows this principle.

// Interview Answer:
//
// Depend on interfaces instead of
// concrete implementations.


// EASY WAY TO REMEMBER

// S
// One Class = One Job

// O
// Add new code without changing old code

// L
// Child should behave like Parent

// I
// Small interfaces are better than one huge interface

// D
// Depend on Interfaces, not concrete classes


// REAL NESTJS PROJECT EXAMPLES

// AuthService
// Responsibility:
// Login, Register, JWT

// EmailService
// Responsibility:
// Send Emails

// DoctorRepository
// Responsibility:
// Database Queries

// JwtStrategy
// New strategy can be added without changing AuthService
// (Open Closed Principle)

// IUserRepository
// CouchbaseRepository
// MongoRepository
// MySqlRepository
// UserService depends on IUserRepository
// (Dependency Inversion Principle)


// INTERVIEW ONE-LINE ANSWERS

// SRP
// A class should have only one responsibility.

// OCP
// Existing code should be closed for modification
// but open for extension.

// LSP
// Child classes should replace parent classes
// without changing program behavior.

// ISP
// Prefer multiple small interfaces
// instead of one large interface.

// DIP
// Depend on abstractions (interfaces),
// not concrete implementations.