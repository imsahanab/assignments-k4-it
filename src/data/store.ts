import bcrypt from "bcrypt";

export type UserRole = "Admin" | "Manager" | "Employee";

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string; // hashed
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface IEmployee {
  id: string;
  name: string;
  role: string;
  department: string;
  salary: number;
  email: string;
  createdBy: string; // user id
  createdAt: string;
  updatedAt: string;
}

// ─── In-memory JSON arrays ────────────────────────────────────────────────────
export const users: IUser[] = [];
export const employees: IEmployee[] = [];

// ─── Simple unique ID generator ──────────────────────────────────────────────
let _counter = 1;
export const generateId = (): string =>
  `${Date.now()}-${(_counter++).toString().padStart(4, "0")}`;

// ─── Seed a default Admin so the app works out of the box ────────────────────
//     Credentials: admin@ems.com / admin123
(async () => {
  const hashed = await bcrypt.hash("admin123", 12);
  users.push({
    id: generateId(),
    name: "Admin User",
    email: "admin@ems.com",
    password: hashed,
    role: "Admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
})();
