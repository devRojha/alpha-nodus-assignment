import { applicationRepository } from "../repository/applicationRepository.js";


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