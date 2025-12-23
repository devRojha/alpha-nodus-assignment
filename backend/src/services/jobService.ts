import type { CreateJobDTO, JobApplicationDTO } from "../types/job.js";
import { jobRepository } from "../repository/jobRepository.js";
import { applicationRepository } from "../repository/applicationRepository.js";
import { email } from "zod";

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
    // is allready applied
    const allreadyApplied = await applicationRepository.isAllreadyFilled(jobId, data.email)
    if (allreadyApplied === true) {
        return {success : false, message : "Allready applied for the job", jobId : jobId}
    }

    // no more the 5 candidate apply for the job
    const countActiveApplicant = await applicationRepository.getCountActiveApplicantion(jobId);
    if (countActiveApplicant >= 5) {
        return {success : false, message : "Application rejecte due to active application is greater than equal to 10", jobId : jobId}
    }

    // is candidate allready applied for the 5 jobs within 24 h

    const candidateApplication = await applicationRepository.getcandidateApplicationWithLastTime(data.email, data.phone);
    const lastHour = // get hour diff
    if (candidateApplication.count >= 5 && lastHour <= 24) {
        return {success : false, message : `Come again after a while becaus your total active application is ${candidateApplication.count} and last time is ${candidateApplication.lastTime}`, jobId : jobId}
    }

    // is have atleast active 10 application


    await jobRepository.createApplication(jobId, data);
    return { success: true, message : "Application submited", jobId : jobId };
};
