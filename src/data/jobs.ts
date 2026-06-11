// In-memory job store for tracking CSV upload worker thread status

export type JobStatus = "pending" | "processing" | "done" | "failed";

export interface Job {
  id: string;
  status: JobStatus;
  fileName: string;
  uploadedBy: string;
  createdAt: string;
  completedAt?: string;
  totalRows?: number;
  insertedCount?: number;
  skipped?: string[];
  error?: string;
}

export const jobs: Job[] = [];
