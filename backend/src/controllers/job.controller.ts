import type { Response, Request } from "express"
import * as jobService from "../services/jobService.js"
import { getErrorResponse } from "../utils/errorMessage.js";


export const createJob = async(req : Request, res : Response) => {
    try {
        const adminID = req.admin?.adminId || ""
        const data = await jobService.createJob(adminID, req.body);
        res.status(200).json(data);
    } 
    catch (err: unknown) {
        getErrorResponse(res, err);
    }
};

// Get all jobs
export const getAllJobs = async(_req : Request, res : Response) => {
    try {
        const data = await jobService.getAllJobs();
        res.status(200).json(data);
    } 
    catch (err: unknown) {
        getErrorResponse(res, err);
    }
}

// Get job by ID (BEST PRACTICE)
export const getJobById = async(req : Request, res : Response) => {

    try {
        var { id } = req.params;
        id = id.slice(1)

        const data = await jobService.getJobById(id);
        res.status(200).json(data);
    }
    catch (err: unknown) {
        getErrorResponse(res, err);
    }
};

// Submit application for a job
export const submitJobApplication = async (req : Request, res : Response) => {
    try {
        var { id } = req.params;
        id = id.slice(1)
        console.log(id);
        const data = await jobService.submitJobApplication(id, req.body)
        res.json({ message: `Application submitted for job ${id}` });
    }
    catch (err: unknown) {
        getErrorResponse(res, err);
    }
};
