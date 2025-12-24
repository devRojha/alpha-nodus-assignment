import express from "express";
import { adminAuthMiddleware } from "../middleware/adminAuthMiddleware.js";
import { updateApplication, getAllApplication, submitJobApplication } from "../controllers/application.controller.js";
import { uploadApplicationFiles } from "../utils/multer.js";


const router = express.Router();


// Get all application
router.get("/", adminAuthMiddleware, getAllApplication);

// submit application
router.post(
    "/:id",

    uploadApplicationFiles.fields([
    { name: "resume", maxCount: 1 },
    { name: "coverLetter", maxCount: 1 },
  ]),
  
  submitJobApplication);

  
// update application
router.put("/", adminAuthMiddleware, updateApplication);

export default router;
 