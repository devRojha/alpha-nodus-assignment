import type { CreateJobDTO, JobApplicationDTO, Job } from "../types/job.js";

export const createJob = async (
  adminId: string,
  data: CreateJobDTO
): Promise<Job> => {
  return {
    id: crypto.randomUUID(),
    title: data.title,
    description: data.description,
    location: data.location,
    salary: data.salary,
    createdBy: adminId
  };
};

export const getAllJobs = async (): Promise<Job[]> => {
  return [];
};

export const getJobById = async (jobId: string): Promise<Job | null> => {
  return null;
};

export const submitJobApplication = async (
  jobId: string,
  data: JobApplicationDTO
): Promise<{ success: boolean }> => {
  return { success: true };
};
