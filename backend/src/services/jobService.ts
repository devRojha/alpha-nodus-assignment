import type { CreateJobDTO } from "../types/job.js";
import { jobRepository } from "../repository/jobRepository.js";

export const createJob = async (
  adminEmail: string,
  data: CreateJobDTO
) => {
    const response = await jobRepository.createJob(adminEmail, data);
    return {success : true, jobId : response.id ,message : "Job created successfully"}
};

export const getAllJobs = async () => {
    const response =  await jobRepository.findAllJobs();
    return {success : true, response : response, message : "all jobs are listed"};
};

export const getJobById = async (jobId: string) => {
    const response = await jobRepository.findJobById(jobId);
    return {success : true, response : response, message : "unique job is listed"};
};