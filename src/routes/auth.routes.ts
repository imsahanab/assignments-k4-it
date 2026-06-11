import { Router } from "express";
import { register, login, getMe } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// POST /auth/register  →  Create account (returns JWT)
router.post("/register", register);

// POST /auth/login     →  Sign in (returns JWT)
router.post("/login", login);

// GET  /auth/me        →  Current user info  [protected]
router.get("/me", authenticate, getMe);

export default router;
