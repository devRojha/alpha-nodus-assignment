import type { Response, Request } from "express"


import * as applicationService from "../services/applicationService.js"
import { getErrorResponse } from "../utils/errorMessage.js";
import { applicationSchema } from "../validators/applicationValidators.js";



export const getAllApplication = async(req : Request, res : Response) => {
    try {
        const data = await applicationService.getAllApplication();

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

export const updateApplication = async(req : Request, res : Response) => {
    try {
        const applicationId = req.body.id;
        const status = req.body.status;
        const data = await applicationService.updateApplication(applicationId, status);
        return res.status(200).json({success : data.success, message : data.message});
    }
    catch (err: unknown) {
        getErrorResponse(res, err);
    }
}

// Submit application for a job
export const submitJobApplication = async (req : Request, res : Response) => {
    try {

        const parseResult = applicationSchema.safeParse(req.body);
        
        if (!parseResult.success) {
            return res.status(400).json({success : false, message : "input validation"});
        }

        var { id } = req.params;
        id = id.slice(1)

        const data = await applicationService.submitJobApplication(id, req.body)
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

