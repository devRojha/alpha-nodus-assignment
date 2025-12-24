import { prisma } from "../lib/prisma.js";
import type { JobApplicationDTO } from "../types/job.js";


export const applicationRepository = {
    createApplication: async (jobId: string, data: JobApplicationDTO) => {
        return await prisma.application.create({
        data: {
            name: data.name,
            email: data.email,
            phone : data.phone,
            resumeUrl: data.resumeUrl,
            coverLetterUrl: data.coverLetterUrl,
            jobId,
        },
        });
    },
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
    },
    getCountActiveApplicantion: async(jobId : string) => {
        const data = prisma.application.count({
            where : {jobId : jobId, status : "active"}
        })
        return data.length;
    },
    getcandidateApplicationWithLastTime : async (email : string, phone : string) => {
        const result = await prisma.application.aggregate({
            where: {
                status: "active",
                OR: [
                    { phone: phone },
                    { email: email },
                ],
            },
            _count: {
                _all: true,
            },
            _max: {
                createdAt: true,
            },
        });

        return {
            count: result._count._all,
            lastTime: result._max.createdAt,
        };
    }
}