import type { CreateJobDTO, JobApplicationDTO } from "../types/job.js";
import { jobRepository } from "../repository/jobRepository.js";

export const createJob = async (
  adminId: string,
  data: CreateJobDTO
) => {
  return jobRepository.createJob(adminId, data);
};

export const getAllJobs = async () => {
  return jobRepository.findAllJobs();
};

export const getJobById = async (jobId: string) => {
  return jobRepository.findJobById(jobId);
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

  await jobRepository.createApplication(jobId, data);
  return { success: true };
};
