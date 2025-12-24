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
            prisma.job.findMany({
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
            prisma.job.count() 
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
                _count: {
                    select: {
                        applications: {
                            where: { status: "active" }
                        }
                    },
                },
            },
        });
    },
};
