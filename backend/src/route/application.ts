import express from "express";
import { adminAuthMiddleware } from "../middleware/adminAuthMiddleware.js";
import { updateApplication, getAllApplication, submitJobApplication } from "../controllers/application.controller.js";


const router = express.Router();


// Get all application
router.get("/", adminAuthMiddleware, getAllApplication);

// submit application
router.post("/:id", submitJobApplication);

// update application
router.put("/", adminAuthMiddleware, updateApplication);

export default router;
