import express from "express";
import { adminAuthMiddleware } from "../middleware/adminAuthMiddleware.js";
import { createJob, getAllJobs, getJobById, submitJobApplication } from "../controllers/job.controller.js";

const router = express.Router();

// Create a job
router.post("/", adminAuthMiddleware, createJob);

// Get all jobs
router.get("/", getAllJobs);

// Get job by ID 
router.get("/:id", getJobById);

// Submit application for a job
router.post("/:id/submit", submitJobApplication);

export default router;
