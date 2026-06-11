import { Router } from "express";
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employee.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

// All employee routes require a valid JWT
router.use(authenticate);

/**
 * Role-based access summary:
 *
 *  Method   Route              Admin   Manager   Employee
 *  ──────   ─────────────────  ──────  ────────  ────────
 *  GET      /employees         ✅      ✅        own only
 *  GET      /employees/:id     ✅      ✅        own only
 *  POST     /employees         ✅      ✅        ❌
 *  PUT      /employees/:id     ✅      ✅        ❌
 *  DELETE   /employees/:id     ✅      ❌        ❌
 */

// GET all employees  (Employee sees only their own record — enforced in controller)
router.get("/", getAllEmployees);

// GET single employee
router.get("/:id", getEmployeeById);

// CREATE employee  →  Admin, Manager
router.post("/", authorize("Admin", "Manager"), createEmployee);

// UPDATE employee  →  Admin, Manager
router.put("/:id", authorize("Admin", "Manager"), updateEmployee);

// DELETE employee  →  Admin only
router.delete("/:id", authorize("Admin"), deleteEmployee);

export default router;
