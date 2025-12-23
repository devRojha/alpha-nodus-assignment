import type { Response, Request } from "express"
import * as jobService from "../services/jobService.js"


export const createJob = async(req : Request, res : Response) => {
    try {
        const adminID = req.admin?.adminId || ""
        const data = await jobService.createJob(adminID, req.body);
        res.status(200).json(data);
    } 
    catch (err: unknown) {
        console.error("Error:", err);

        if (err instanceof Error) {
            return res.status(500).json({ error: err.message });
        }

        return res.status(500).json({ error: "Something went wrong" });
    }
};

// Get all jobs
export const getAllJobs = async(_req : Request, res : Response) => {
    try {
        const data = await jobService.getAllJobs();
        res.status(200).json(data);
    } 
    catch (err: unknown) {
        console.error("Error:", err);

        if (err instanceof Error) {
            return res.status(500).json({ error: err.message });
        }

        return res.status(500).json({ error: "Something went wrong" });
    }
}

// Get job by ID (BEST PRACTICE)
export const getJobById = async(req : Request, res : Response) => {

    try {
        const { id } = req.params;
        const data = await jobService.getJobById(id);
        res.status(200).json(data);
    }
    catch (err: unknown) {
        console.error("Error:", err);

        if (err instanceof Error) {
            return res.status(500).json({ error: err.message });
        }

        return res.status(500).json({ error: "Something went wrong" });
    }
};

// Submit application for a job
export const submitJobApplication = async (req : Request, res : Response) => {
    try {
        const { id } = req.params;
        const data = await jobService.submitJobApplication(id, req.body)
        res.json({ message: `Application submitted for job ${id}` });
    }
    catch (err: unknown) {
        console.error("Error:", err);

        if (err instanceof Error) {
            return res.status(500).json({ error: err.message });
        }

        return res.status(500).json({ error: "Something went wrong" });
    }
};
