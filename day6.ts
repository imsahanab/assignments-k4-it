//  Today's Notes

// TypeScript Topics
// Generics
// Reusable code for multiple data types.
// Example:

function getData<T>(data: T): T {
  return data;
}

console.log(getData("Sahana"));
console.log(getData(22));

// Use: APIs, utility functions, reusable components.

// Union Type


let value: string | number;

value = "Sahana";
value = 22;

// when a value can be more than one type.

// Intersection Type

type Person = {
  name: string;
};

type Employee = {
  salary: number;
};

type Staff = Person & Employee;

//  Combines multiple types.

//  keyof

type User = {
  name: string;
  age: number;
};

type Keys = keyof User;
// Output:
// "name" | "age"

//  typeof


const user = {
  name: "Sahana",
  age: 22
};

type UserType = typeof user;


// Type Guards
function print(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  }
}


/* *TypeScript Folder Structure
typescript/
│
├── 01-types.ts
├── 02-arrays.ts
├── 03-objects.ts
├── 04-interface-vs-type.ts
├── 05-any.ts
├── 06-union.ts
├── 07-intersection.ts
├── 08-generics.ts
├── 09-keyof.ts
├── 10-typeof.ts
├── 11-type-guards.ts
├── 12-pick.ts
├── 13-omit.ts
├── 14-partial.ts
├── 15-required.ts
├── 16-readonly.ts
├── 17-record.ts
├── 18-exclude.ts
├── 19-extract.ts
├── 20-returntype.ts
├── 21-parameters.ts
 */

//NestJS Notes
// What is NestJS?

/*- Node.js framework.
- Built on top of Express.
- Uses TypeScript.
- Modular architecture.
*/

/* // Controller
@Controller("users")
export class UserController {

  @Get()
  getUsers() {
    return "All Users";
  }

}
// Service
@Injectable()
export class UserService {

  getUsers() {
    return ["Sahana", "Ravi"];
  }

}

// CRUD
 */

/* @Get()
getUsers()

@Post()
createUser()

@Put(':id')
updateUser()

@Delete(':id')
deleteUser()
 */

