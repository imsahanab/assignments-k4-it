
// TYPE ALIAS
// A Type Alias is used to create a custom name for an existing type.

// Creating a custom type called ID
type ID = string | number;

// userId can be string or number
let userId: ID = 101;

console.log("User ID:", userId);

userId = "EMP101";

console.log("Updated User ID:", userId);



// INTERFACE


// Interface acts as a blueprint for creating structure for an object.
//if the structure changes in following object it throws error.
interface Student {
  name: string;
  age: number;
}

// Object must follow Student structure no less or no extra
const student: Student = {
  name: "Sahana",
  age: 22
};

console.log("Student:", student);


// ENUM:
// Enum is used for fixed values
enum Role {
  Admin = "ADMIN",
  User = "USER",
  Manager = "MANAGER"
}

// Variable can only use values from Role enum if we use different its a mistake to avoid thos enum is created.
let userRole: Role = Role.Admin;

console.log("Role:", userRole);

// CLASS

// Class is a blueprint for creating objects
class Employee {

  // Properties
  name: string;
  salary: number;

  // Constructor runs when object is created
  constructor(name: string, salary: number) {
    this.name = name;
    this.salary = salary;
  }

  // Method
  display() {
    console.log(
      `Employee Name: ${this.name}, Salary: ${this.salary}`
    );
  }
}

// Creating object from class
const emp1 = new Employee("Sahana", 50000); // creating object and providing the value for that.

emp1.display();

// GENERIC

// Generic Function allows us to write one function that can work with different data types while maintaining type safety.
function getValue<T>(value: T): T {
  return value;
}
//while consoling we can define its datatype t is string at first then number then boolean so its typesafety.
console.log("Generic String:", getValue<string>("Hello"));

console.log("Generic Number:", getValue<number>(100));

console.log("Generic Boolean:", getValue<boolean>(true));



