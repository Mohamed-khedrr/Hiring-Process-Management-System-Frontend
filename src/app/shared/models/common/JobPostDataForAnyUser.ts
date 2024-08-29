import { JobPostPublicNumbers } from "./jobPostPublicNumbers";

export interface JobPostDataForAnyUser {
  id: string;
  jobTitle: string;
  jobType: string;
  employmentType: string;
  minExperienceYears: number;
  maxExperienceYears: number;
  industry: {
    id: number;
    industry: string;
  };
  jobName: {
    id: number;
    name: string;
  };
  minSalary: number;
  maxSalary: number;
  currency: string;
  description: string;
  requirements: string;
  benefits: string;
  draft: boolean;
  open: boolean;
  skills: string[];
  createdOn: string;
  updatedOn: string;
  maxApplication: number;
  gender: string | null;
  educationLevel: string | null;
  company: any | null;
  companyLocation: string;
  creator: any | null;
  deleted: boolean;
  saved: any;
  publicNumbers: JobPostPublicNumbers;
}
