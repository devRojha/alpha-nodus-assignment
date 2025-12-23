import type { Response, Request } from "express"
import * as jobService from "../services/jobService.js"
import { getErrorResponse } from "../utils/errorMessage.js";


export const createJob = async(req : Request, res : Response) => {
    try {
        const adminEmail = req.admin?.adminEmail || "dev@gmail.com"
        const data = await jobService.createJob(adminEmail, req.body);
        if (data.success === true) {
            res.status(200).json( data );
        }
        else {
            res.status(404).json( data );
        }
    } 
    catch (err: unknown) {
        getErrorResponse(res, err);
    }
};

// Get all jobs
export const getAllJobs = async(_req : Request, res : Response) => {
    try {
        const data = await jobService.getAllJobs();

        if (data.success === true) {
            res.status(200).json( data );
        }
        else {
            res.status(404).json(data);
        }
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
        if (data.success === true) {
            res.status(200).json(data);
        }
        else {
            res.status(404).json(data);
        }
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

        const data = await jobService.submitJobApplication(id, req.body)
        if (data.success === true) {
            res.status(200).json(data);
        }
        else {
            res.status(403).json(data);
        }
    }
    catch (err: unknown) {
        getErrorResponse(res, err);
    }
};
