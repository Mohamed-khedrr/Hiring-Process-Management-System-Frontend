// export interface JobPostData {
//   companyLocation: string;
//   id?: string;
//   jobTitle: string;
//   jobType: string;
//   employmentType: string;
//   minExperienceYears: number;
//   maxExperienceYears: number;
//   industry: {
//     id: number;
//     industry: string;
//   };
//   jobName: {
//     id: number;
//     name: string;
//   };
//   minSalary: number;
//   maxSalary: number;
//   currency: string;
//   description: string;
//   requirements: string;
//   benefits: string;
//   draft: boolean;
//   open: boolean;
//   createdOn: string;
//   updatedOn: string;
//   maxApplication: number;
//   gender: string | null;
//   educationLevel: string | null;
//   applications: any[] | null;
//   company: any | null;
//   creator: any | null;
//   questions: any[] | null;
//   recruitersTeam: any[] | null;
// }

import { JobPostsDashboardNumbers } from "../job-post/job-posts-dashboard-numbers";
import { JobPostAppNumbers } from "./JobPostAppNumbers";
import { JobPostPublicNumbers } from "./jobPostPublicNumbers";

export interface JobPostData {
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
  createdOn: string;
  updatedOn: string;
  maxApplication: number;
  gender: string | null;
  educationLevel: string | null;
  jobApplications: any[] | null;
  company: any | null;
  companyLocation: string;
  creator: any | null;
  questions: any[] | null;
  recruitersTeam: any[] | null;
  deleted: boolean;
  numberPerStatus: JobPostAppNumbers
  dashboardNumbers: JobPostsDashboardNumbers
}
