import express from "express";

const router = express.Router();

// Create a job
router.post("/", (req, res) => {
  res.json({ message: "Job created" });
});

// Get all jobs
router.get("/", (_req, res) => {
  res.json({ message: "All jobs" });
});

// Get job by ID (BEST PRACTICE)
router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ message: `Job ${id}` });
});

// Submit application for a job
router.post("/:id/submit", (req, res) => {
  const { id } = req.params;
  res.json({ message: `Application submitted for job ${id}` });
});

export default router;
