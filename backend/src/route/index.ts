import express, { application } from "express"
import adminRoute from "./admin.js"
import jobRoute from "./job.js"
import applicationRoute from "./application.js"

const router = express.Router();


// routing list 

router.use("/admin", adminRoute)

router.use("/job", jobRoute)

router.use("/application", applicationRoute)


export default router
