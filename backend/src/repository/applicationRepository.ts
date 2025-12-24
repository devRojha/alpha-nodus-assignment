import { prisma } from "../lib/prisma.js";


export const applicationRepository = {
    createApplication: async (jobId: string, data: any) => {
        return prisma.application.create({
            data: {
            jobId,
            name: data.name,
            email: data.email,
            phone: data.phone,
            resumeUrl: data.resumeUrl,
            coverLetterUrl: data.coverLetterUrl,
            },
        });
    },

    isAllreadyFilled: async (jobId : string, userEmail : string, userPhone : string) => {
        const response = await prisma.application.findMany({
            where : {jobId, OR: [
                { email: userEmail },
                { phone: userPhone }
            ]}
        })
        if (response.length > 0) {
            return true;
        }
        else {
            return false;
        }
    },
    findAllApplication: async (skip: number, limit: number) => {
        const [applications, total] = await Promise.all([
            prisma.application.findMany({
                where: { status: "active" },
                skip: skip,
                take: limit,
                orderBy: { createdAt: "asc" },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    resumeUrl: true,
                    createdAt: true,
                    status: true,
                    job: {
                        select: {
                            title: true,
                        },
                    },
                },
            }),
            prisma.application.count({ where: { status: "active" } })
        ]);

        return { applications, total };
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