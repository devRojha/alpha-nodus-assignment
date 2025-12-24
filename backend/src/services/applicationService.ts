import { applicationRepository } from "../repository/applicationRepository.js";
import { jobRepository } from "../repository/jobRepository.js";
import type { JobApplicationDTO } from "../types/job.js";
import { getHoursDiff } from "../utils/MathmaticCalculation.js";


export const getAllApplication = async () => {
    const response =  await applicationRepository.findAllApplication();
    return {success : true, response : response, message : "all applications are listed"};
};

export const updateApplication = async(applicationId : string, status : string) => {

    const response = {success : true, message : ""}

    if (status === "hired") {
        response["message"] = "Person Hired";
    }
    else {
        response["message"] = "Person Rejected";
    }
    await applicationRepository.updateApplication(applicationId, status);
    return response
}


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

    // is candidate allready applied for the 5 jobs and current applied is within 24 h
    const candidateApplication = await applicationRepository.getcandidateApplicationWithLastTime(data.email, data.phone);
    const lastHour = candidateApplication.lastTime? getHoursDiff(candidateApplication.lastTime) : 26; // no previous application
    if (candidateApplication.count >= 5 && lastHour <= 24) {
        return {success : false, message : `Come again after a while becaus your total active application is ${candidateApplication.count} and last time is ${candidateApplication.lastTime}`, jobId : jobId}
    }

    // is have atleast active 10 application


    await applicationRepository.createApplication(jobId, data);
    return { success: true, message : "Application submited", jobId : jobId };
};
