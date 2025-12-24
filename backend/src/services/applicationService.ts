import { applicationRepository } from "../repository/applicationRepository.js";
import { jobRepository } from "../repository/jobRepository.js";
import type { ApplicationQuery } from "../types/application_query.js";
import type { JobApplicationDTO } from "../types/job.js";
import { getHoursDiff } from "../utils/MathmaticCalculation.js";


export const getAllApplication = async (query : ApplicationQuery) => {
    const limit = 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * limit;

    const { applications, total } = await applicationRepository.findAllApplication(skip, limit);

    return {
        success: true,
        message: "All applications are listed",
        data: {
            applications,
            total,
            page,
            totalPages: Math.ceil(total / limit),
            hasMore: page < Math.ceil(total / limit)
        }
    };
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
  data: JobApplicationDTO,
  files: {
    resumePath: string;
    coverLetterPath?: string | null;
  }
) => {
  // Business rule example
    const job = await jobRepository.findJobById(jobId);
    if (!job) {
        throw new Error("Job not found");
    }

    // is allready applied
    const allreadyApplied = await applicationRepository.isAllreadyFilled(jobId, data.email, data.phone)
    if (allreadyApplied === true) {
        return {success : false, message : "Already applied for the job", jobId : jobId}
    }

    // no more the 5 candidate apply for the job
    const countActiveApplicant = await applicationRepository.getCountActiveApplicantion(jobId);
    if (countActiveApplicant >= 5) {
        return {success : false, message : "Application rejected because this job already has 5 active applications", jobId : jobId}
    }

    // is candidate allready applied for the 5 jobs and current applied is within 24 h
    const candidateApplication = await applicationRepository.getcandidateApplicationWithLastTime(data.email, data.phone);
    const hoursSinceLastApplication = candidateApplication.lastTime
    ? getHoursDiff(candidateApplication.lastTime)
    : 36; // more than 24 h

    if (candidateApplication.count >= 5 && hoursSinceLastApplication <= 24) {
        return {
            success: false,
            message:
            `You have reached the maximum limit of 5 active applications. Please try again after ${24 - hoursSinceLastApplication} hours.`,
            jobId
        };
    }


    await applicationRepository.createApplication(jobId, {
        name: data.name,
        email: data.email,
        phone: data.phone,
        resumeUrl: files.resumePath,
        coverLetterUrl: files.coverLetterPath,
    });
    return { success: true, message : "Application submited", jobId : jobId };
};
