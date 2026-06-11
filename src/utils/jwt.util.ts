import jwt from "jsonwebtoken";
import { UserRole } from "../data/store";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_change_me";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "24h";

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export const signToken = (payload: JwtPayload): string =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);

export const verifyToken = (token: string): JwtPayload =>
  jwt.verify(token, JWT_SECRET) as JwtPayload;
