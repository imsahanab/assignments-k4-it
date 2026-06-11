# Employee Management System (EMS)
## JWT Authentication + Role-Based Authorization

---

## Project Structure

```
employee-management/
├── src/
│   ├── config/
│   │   └── db.ts                    # MongoDB connection
│   ├── controllers/
│   │   ├── auth.controller.ts       # register, login, getMe
│   │   ├── employee.controller.ts   # CRUD operations
│   │   └── upload.controller.ts     # CSV import / export
│   ├── middleware/
│   │   ├── auth.middleware.ts       # JWT verification (authenticate)
│   │   ├── role.middleware.ts       # Role-based guard (authorize)
│   │   └── upload.middleware.ts     # Multer CSV file handler
│   ├── models/
│   │   ├── user.model.ts            # User schema (with bcrypt)
│   │   └── employee.model.ts        # Employee schema
│   ├── routes/
│   │   ├── auth.routes.ts           # /auth/*
│   │   ├── employee.routes.ts       # /employees/*
│   │   └── upload.routes.ts         # /upload/*
│   ├── utils/
│   │   └── jwt.util.ts              # signToken / verifyToken
│   ├── workers/
│   │   └── csv.worker.js            # Worker thread for CSV parsing
│   ├── app.ts                       # Express app setup
│   └── server.ts                    # Entry point
├── employees.csv                    # Sample CSV data
├── .env.example                     # Environment variable template
├── package.json
└── tsconfig.json
```

---

## Authentication & Authorization Flow

```
Request
   │
   ▼
┌──────────────────────────────────┐
│  authenticate middleware          │
│  • Reads Authorization header     │
│  • Extracts Bearer token          │
│  • jwt.verify(token, JWT_SECRET)  │
│  • Attaches decoded payload       │
│    { userId, email, role }        │
│    to req.user                    │
└──────────────────┬───────────────┘
                   │  ✅ valid token
                   ▼
┌──────────────────────────────────┐
│  authorize(...roles) middleware   │
│  • Checks req.user.role           │
│  • Compares against allowed roles │
│  • 403 if not permitted           │
└──────────────────┬───────────────┘
                   │  ✅ role allowed
                   ▼
             Controller
```

---

## Role Permissions

| Operation            | Admin | Manager | Employee       |
|----------------------|:-----:|:-------:|:--------------:|
| Register / Login     | ✅    | ✅      | ✅             |
| View own profile     | ✅    | ✅      | ✅             |
| View all employees   | ✅    | ✅      | ❌ (own only)  |
| Create employee      | ✅    | ✅      | ❌             |
| Update employee      | ✅    | ✅      | ❌             |
| Delete employee      | ✅    | ❌      | ❌             |
| Import CSV           | ✅    | ✅      | ❌             |
| Export CSV           | ✅    | ✅      | ❌             |

---

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env with your MongoDB URI and a strong JWT_SECRET
```

### 3. Start development server
```bash
npm run dev
```

---

## API Reference

### Auth

#### Register
```
POST /auth/register
Content-Type: application/json

{
  "name": "Alice",
  "email": "alice@company.com",
  "password": "secret123",
  "role": "Admin"          ← "Admin" | "Manager" | "Employee"
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "alice@company.com",
  "password": "secret123"
}
```
**Response includes a JWT token** — use it in subsequent requests:
```
Authorization: Bearer <token>
```

#### Get current user
```
GET /auth/me
Authorization: Bearer <token>
```

---

### Employees (all require Authorization header)

#### List employees
```
GET /employees?page=1&limit=10
Authorization: Bearer <token>
```
- Admin/Manager → full paginated list
- Employee → only their own record (matched by email)

#### Get one employee
```
GET /employees/:id
Authorization: Bearer <token>
```

#### Create employee
```
POST /employees
Authorization: Bearer <token>   ← Admin or Manager only
Content-Type: application/json

{
  "name": "Ravi",
  "role": "Developer",
  "department": "Engineering",
  "salary": 60000,
  "email": "ravi@company.com"
}
```

#### Update employee
```
PUT /employees/:id
Authorization: Bearer <token>   ← Admin or Manager only
Content-Type: application/json

{ "salary": 65000 }
```

#### Delete employee
```
DELETE /employees/:id
Authorization: Bearer <token>   ← Admin only
```

---

### CSV Operations (Admin or Manager only)

#### Import employees from CSV
```
POST /upload/csv
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: employees.csv
```
Expected CSV format:
```csv
name,role,department,salary,email
Sahana,Developer,Engineering,50000,sahana@company.com
```

#### Export employees as CSV
```
GET /upload/export
Authorization: Bearer <token>
```
Returns a downloadable `employees_<timestamp>.csv` file.

---

## CSV Import Flow

```
Client uploads file
       │
       ▼
  Multer middleware
  (validates CSV, saves to /uploads/)
       │
       ▼
  Worker Thread (csv.worker.js)
  (parses CSV rows off the main thread)
       │
       ▼
  Employee.insertMany(rows)
  (bulk insert with createdBy = req.user.userId)
       │
       ▼
  Response: { count, data }
```
