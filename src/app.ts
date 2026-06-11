import express from "express";
import authRoutes from "./routes/auth.routes";
import employeeRoutes from "./routes/employee.routes";
import uploadRoutes from "./routes/upload.routes";

const app = express();

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (_req, res) => {
  res.json({
    status: "running",
    message: "Employee Management System API",
    version: "2.0.0",
  });
});

// Routes
app.use("/auth", authRoutes);
app.use("/employees", employeeRoutes);
app.use("/upload", uploadRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

// Global error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error.",
  });
});

export default app;
