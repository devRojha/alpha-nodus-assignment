export interface CreateJobDTO {
  title: string;
  description: string;
  location: string;
  salary?: number;
}

export interface JobApplicationDTO {
  name: string;
  email: string;
  phone: string;
  resumeUrl: string;
  coverLetterUrl? : string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  salary?: number;
  createdBy: string;
}
