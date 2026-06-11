import { Router } from "express";
import upload from "../middleware/upload.middleware";
import { uploadCSV, exportCSV, getJobStatus, getAllJobs } from "../controllers/upload.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

router.use(authenticate);
router.use(authorize("Admin", "Manager"));

// POST /upload/csv          → Upload CSV (Worker Thread processes in background)
router.post("/csv", upload.single("file"), uploadCSV);

// GET  /upload/job/:jobId   → Poll job status
router.get("/job/:jobId", getJobStatus);

// GET  /upload/jobs         → List all jobs
router.get("/jobs", getAllJobs);

// GET  /upload/export       → Download all employees as CSV
router.get("/export", exportCSV);

export default router;
