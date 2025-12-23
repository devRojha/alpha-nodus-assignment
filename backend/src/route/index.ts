import express from "express"
import adminRoute from "./admin.js"
import jobRoute from "./job.js"

const router = express.Router();


// routing list 

router.use("/admin", adminRoute)

router.use("/job", jobRoute)


export default router
