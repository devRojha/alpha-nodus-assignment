import { prisma } from "../lib/prisma.js";

export const applicationRepository = {
    isAllreadyFilled: async (jobId : string, userEmail : string) => {
        const response = await prisma.application.findMany({
            where : {jobId, email : userEmail}
        })
        if (response.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }
}