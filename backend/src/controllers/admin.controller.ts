import * as adminService from "../services/adminService.js"

import type { Response, Request } from "express"


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
        console.error("Error:", err);

        if (err instanceof Error) {
            return res.status(500).json({ error: err.message });
        }

        return res.status(500).json({ error: "Something went wrong" });
    }
}
