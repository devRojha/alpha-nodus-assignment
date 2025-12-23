import type { Response, Request } from "express"


import * as applicationService from "../services/applicationService.js"
import { getErrorResponse } from "../utils/errorMessage.js";



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
