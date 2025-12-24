import type { CreateJobDTO } from "../types/job.js";
import { jobRepository } from "../repository/jobRepository.js";
import type { JobQuery } from "../types/job_query.js";

export const createJob = async (
  adminEmail: string,
  data: CreateJobDTO
) => {
    const response = await jobRepository.createJob(adminEmail, data);
    return {success : true, jobId : response.id ,message : "Job created successfully"}
};


export const getAllJobs = async (query: JobQuery) => {
    const limit = 10;
    const page = Number(query.page);
    const skip = Number(page - 1) * limit;

    const { jobs, total } = await jobRepository.findAllJobs(skip, limit);
    return {
        success: true,
        message: "All jobs are listed",
        data: {
            jobs,
            total,
            page,
            totalPages: Math.ceil(total / limit),
            hasMore: page < Math.ceil(total / limit)
        }
    };
};

export const getJobById = async (jobId: string) => {
    const response = await jobRepository.findJobById(jobId);
    return {success : true, response : response, message : "unique job is listed"};
};