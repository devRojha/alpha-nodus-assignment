import express from "express"
import { adminSignin } from "../controllers/admin.controller.js";

const router = express();



router.post("/signin", adminSignin);


export default router;