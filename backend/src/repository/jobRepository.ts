import { prisma } from "../lib/prisma.js";
import type { CreateJobDTO } from "../types/job.js";

export const jobRepository = {
    createJob: async (adminEmail: string, data: CreateJobDTO) => {
        return await prisma.job.create({
        data: {
            title: data.title,
            description: data.description,
            location: data.location,
            salary: data.salary,
            adminEmail,
        },
        });
    },

    findAllJobs: async (skip: number, limit: number) => {
        // We run both queries in parallel for better performance
        const [jobs, total] = await Promise.all([
            await prisma.job.findMany({
                skip: skip,
                take: limit,
                include: {
                    admin: {
                        select: {
                            email: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
            }),
            await prisma.job.count() // Get total count for pagination math
        ]);

        return { jobs, total };
    },

    findJobById: async (jobId: string) => {
        return await prisma.job.findUnique({
        where: { id: jobId },
        include: {
            admin: {
            select: {
                email: true,
            },
            },
            applications: true,
        },
        });
    },
};
