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
    },
    findAllApplication: async () => {
        return await prisma.application.findMany({
        where : {status : "active"},
        orderBy: {
            createdAt: "desc",
        },
        });
    },
    updateApplication: async (applicationId : string, status : string) => {
        return await prisma.application.update({
            where : {id : applicationId},
            data : {
                status : status
            }
        })
    }
}