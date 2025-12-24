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

    findAllJobs: async () => {
        return await prisma.job.findMany({
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
        });
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
