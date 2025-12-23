import express from "express";
import { adminAuthMiddleware } from "../middleware/adminAuthMiddleware.js";
import { updateApplication, getAllApplication } from "../controllers/application.controller.js";

const router = express.Router();


// Get all jobs
router.get("/", adminAuthMiddleware, getAllApplication);

// update application
router.put("/", adminAuthMiddleware, updateApplication);

export default router;
