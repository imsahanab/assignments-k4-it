import { Request, Response, NextFunction } from "express";
import { UserRole } from "../data/store";

export const authorize = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ success: false, message: "Authentication required before authorization." });
      return;
    }
    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: `Access denied. Required role(s): ${allowedRoles.join(" or ")}. Your role: ${req.user.role}.`,
      });
      return;
    }
    next();
  };
};
