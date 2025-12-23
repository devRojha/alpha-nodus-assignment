import * as adminService from "../services/adminService.js"

import type { Response, Request } from "express"
import { getErrorResponse } from "../utils/errorMessage.js";


export const adminSignin = async(req : Request, res : Response) => {
    try {
        const response = adminService.adminSignin(req.body);
        if (response.success === false) {
            res.status(401).json(response);
        }
        else {
            res.status(200).json(response);
        }

    }
    catch (err: unknown) {
        getErrorResponse(res, err);
    }
}
