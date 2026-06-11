import { Request, Response } from "express";
import { Worker } from "worker_threads";
import path from "path";
import fs from "fs";
import { employees, users, generateId, IEmployee } from "../data/store";
import { jobs, Job } from "../data/jobs";

// ─── POST /upload/csv ─────────────────────────────────────────────────────────
// Accepts a CSV file, spins up a Worker Thread to parse it,
// stores results in the JSON array, and returns a job ID for status polling.
export const uploadCSV = async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ success: false, message: "No CSV file uploaded." });
    return;
  }

  // Create a job record immediately
  const job: Job = {
    id: generateId(),
    status: "pending",
    fileName: req.file.originalname,
    uploadedBy: req.user!.userId,
    createdAt: new Date().toISOString(),
  };
  jobs.push(job);

  // Respond right away with the job ID — processing happens in background
  res.status(202).json({
    success: true,
    message: "CSV upload accepted. Processing in background via Worker Thread.",
    jobId: job.id,
    statusUrl: `/upload/job/${job.id}`,
  });

  // ── Spin up Worker Thread ──────────────────────────────────────────────────
  const filePath = req.file.path;
  const workerPath = path.join(__dirname, "../workers/csv.worker.js");

  job.status = "processing";

  const worker = new Worker(workerPath, { workerData: { filePath } });

  worker.on("message", (result: any) => {
    fs.unlink(filePath, () => {});

    if (!result.success) {
      job.status = "failed";
      job.error = result.error;
      job.completedAt = new Date().toISOString();
      return;
    }

    const rows: any[] = result.data;
    const now = new Date().toISOString();

    const inserted: IEmployee[] = rows.map((row) => ({
      id: generateId(),
      name: row.name,
      role: row.role,
      department: row.department,
      salary: row.salary,
      email: row.email,
      createdBy: req.user!.userId,
      createdAt: now,
      updatedAt: now,
    }));

    employees.push(...inserted);

    job.status = "done";
    job.insertedCount = inserted.length;
    job.totalRows = rows.length + (result.skipped?.length || 0);
    job.skipped = result.skipped || [];
    job.completedAt = new Date().toISOString();
  });

  worker.on("error", (err: Error) => {
    fs.unlink(filePath, () => {});
    job.status = "failed";
    job.error = err.message;
    job.completedAt = new Date().toISOString();
  });
};

// ─── GET /upload/job/:jobId ───────────────────────────────────────────────────
// Poll this endpoint to check the status of a CSV import job.
export const getJobStatus = async (req: Request, res: Response): Promise<void> => {
  const job = jobs.find((j) => j.id === req.params.jobId);

  if (!job) {
    res.status(404).json({ success: false, message: "Job not found." });
    return;
  }

  const uploader = users.find((u) => u.id === job.uploadedBy);

  res.status(200).json({
    success: true,
    job: {
      ...job,
      uploadedBy: uploader
        ? { id: uploader.id, name: uploader.name, email: uploader.email }
        : job.uploadedBy,
    },
  });
};

// ─── GET /upload/jobs ─────────────────────────────────────────────────────────
// List all CSV import jobs (Admin & Manager only).
export const getAllJobs = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({
    success: true,
    total: jobs.length,
    jobs: jobs.map((j) => ({
      id: j.id,
      fileName: j.fileName,
      status: j.status,
      insertedCount: j.insertedCount,
      createdAt: j.createdAt,
      completedAt: j.completedAt,
    })),
  });
};

// ─── GET /upload/export ───────────────────────────────────────────────────────
export const exportCSV = async (req: Request, res: Response): Promise<void> => {
  try {
    if (employees.length === 0) {
      res.status(404).json({ success: false, message: "No employee data to export." });
      return;
    }

    const headers = ["name", "role", "department", "salary", "email"];
    const csvRows = [
      headers.join(","),
      ...employees.map((e) =>
        [e.name, e.role, e.department, e.salary, e.email]
          .map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`)
          .join(",")
      ),
    ];

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="employees_${Date.now()}.csv"`);
    res.status(200).send(csvRows.join("\n"));
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
