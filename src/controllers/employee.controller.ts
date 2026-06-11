import { Request, Response } from "express";
import { employees, users, generateId, IEmployee } from "../data/store";

const withCreator = (emp: IEmployee) => {
  const creator = users.find((u) => u.id === emp.createdBy);
  return {
    ...emp,
    createdBy: creator
      ? { id: creator.id, name: creator.name, email: creator.email, role: creator.role }
      : emp.createdBy,
  };
};

/** GET /employees */
export const getAllEmployees = async (req: Request, res: Response): Promise<void> => {
  try {
    const { role, email } = req.user!;

    if (role === "Admin" || role === "Manager") {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const total = employees.length;
      const data = employees
        .slice((page - 1) * limit, page * limit)
        .map(withCreator);

      res.status(200).json({
        success: true,
        data,
        pagination: { total, page, limit, pages: Math.ceil(total / limit) },
      });
    } else {
      // Employee: own record only
      const record = employees.find((e) => e.email === email);
      res.status(200).json({ success: true, data: record ? [withCreator(record)] : [] });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/** GET /employees/:id */
export const getEmployeeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { role, email } = req.user!;

    const employee = employees.find((e) => e.id === id);
    if (!employee) {
      res.status(404).json({ success: false, message: "Employee not found." });
      return;
    }

    if (role === "Employee" && employee.email !== email) {
      res.status(403).json({
        success: false,
        message: "Access denied. You can only view your own profile.",
      });
      return;
    }

    res.status(200).json({ success: true, data: withCreator(employee) });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/** POST /employees */
export const createEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, role, department, salary, email } = req.body;

    if (!name || !role) {
      res.status(400).json({ success: false, message: "Name and role are required." });
      return;
    }

    const now = new Date().toISOString();
    const newEmp: IEmployee = {
      id: generateId(),
      name: name.trim(),
      role: role.trim(),
      department: department?.trim() || "",
      salary: salary ? Number(salary) : 0,
      email: email?.toLowerCase().trim() || "",
      createdBy: req.user!.userId,
      createdAt: now,
      updatedAt: now,
    };
    employees.push(newEmp);

    res.status(201).json({
      success: true,
      message: "Employee created successfully.",
      data: withCreator(newEmp),
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/** PUT /employees/:id */
export const updateEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const idx = employees.findIndex((e) => e.id === id);

    if (idx === -1) {
      res.status(404).json({ success: false, message: "Employee not found." });
      return;
    }

    const allowed = ["name", "role", "department", "salary", "email"];
    const updates: Partial<IEmployee> = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) (updates as any)[key] = req.body[key];
    }
    if (updates.salary !== undefined) updates.salary = Number(updates.salary);

    employees[idx] = { ...employees[idx], ...updates, updatedAt: new Date().toISOString() };

    res.status(200).json({
      success: true,
      message: "Employee updated successfully.",
      data: withCreator(employees[idx]),
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/** DELETE /employees/:id */
export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const idx = employees.findIndex((e) => e.id === id);

    if (idx === -1) {
      res.status(404).json({ success: false, message: "Employee not found." });
      return;
    }

    const [deleted] = employees.splice(idx, 1);
    res.status(200).json({
      success: true,
      message: `Employee "${deleted.name}" deleted successfully.`,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
