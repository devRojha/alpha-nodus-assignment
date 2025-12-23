import type { CreateJobDTO, JobApplicationDTO } from "../types/job.js";
import { jobRepository } from "../repository/jobRepository.js";
import { applicationRepository } from "../repository/applicationRepository.js";

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

export const submitJobApplication = async (
  jobId: string,
  data: JobApplicationDTO
) => {
  // Business rule example
    const job = await jobRepository.findJobById(jobId);
    if (!job) {
        throw new Error("Job not found");
    }
    const allreadyApplied = await applicationRepository.isAllreadyFilled(jobId, data.email)
    if (allreadyApplied === true) {
        return {success : false, message : "Allready applied for the job", jobId : jobId}
    }
    await jobRepository.createApplication(jobId, data);
    return { success: true, message : "Application submited", jobId : jobId };
};
