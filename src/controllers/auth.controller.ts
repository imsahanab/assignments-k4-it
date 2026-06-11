import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { users, generateId, IUser, UserRole } from "../data/store";
import { signToken } from "../utils/jwt.util";

const sanitize = (u: IUser) => ({
  id: u.id,
  name: u.name,
  email: u.email,
  role: u.role,
  createdAt: u.createdAt,
});

/** POST /auth/register */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ success: false, message: "Name, email, and password are required." });
      return;
    }

    if (users.find((u) => u.email === email.toLowerCase())) {
      res.status(409).json({ success: false, message: "A user with this email already exists." });
      return;
    }

    const hashed = await bcrypt.hash(password, 12);
    const now = new Date().toISOString();
    const newUser: IUser = {
      id: generateId(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashed,
      role: (role as UserRole) || "Employee",
      createdAt: now,
      updatedAt: now,
    };
    users.push(newUser);

    const token = signToken({ userId: newUser.id, email: newUser.email, role: newUser.role });

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      token,
      user: sanitize(newUser),
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/** POST /auth/login */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: "Email and password are required." });
      return;
    }

    const user = users.find((u) => u.email === email.toLowerCase());
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ success: false, message: "Invalid email or password." });
      return;
    }

    const token = signToken({ userId: user.id, email: user.email, role: user.role });

    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: sanitize(user),
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/** GET /auth/me */
export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = users.find((u) => u.id === req.user!.userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found." });
      return;
    }
    res.status(200).json({ success: true, user: sanitize(user) });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
