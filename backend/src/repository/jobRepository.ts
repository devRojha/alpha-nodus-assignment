import { prisma } from "../lib/prisma.js";
import type { CreateJobDTO, JobApplicationDTO } from "../types/job.js";

export const jobRepository = {
  createJob: async (adminId: string, data: CreateJobDTO) => {
    console.log(adminId)
    return await prisma.job.create({
      data: {
        title: data.title,
        description: data.description,
        location: data.location,
        salary: data.salary,
        adminId,
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

  createApplication: async (jobId: string, data: JobApplicationDTO) => {
    return await prisma.application.create({
      data: {
        name: data.name,
        email: data.email,
        resumeUrl: data.resumeUrl,
        coverLetterUrl: data.coverLetterUrl,
        jobId,
      },
    });
  },
};
