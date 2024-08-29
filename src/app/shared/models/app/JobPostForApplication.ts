import { JobPostPublicNumbers } from "../common/jobPostPublicNumbers";
import { ApplicationStatus } from "./ApplicationStatus";
import { EmploymentType } from "./EmployentType";
import { JobType } from "./JobType";

export interface JobPostForApplication {
    jobId: string; // UUID as a string
    jobTitle: string;
    jobType: JobType;
    employmentType: EmploymentType;
    open: boolean;
    appUpdatedAt: string; // ISO 8601 date string
    companyLogo: string;
    companyLocation: string;
    publicNumbers: JobPostPublicNumbers;
    deleted: boolean;
    applicationId: string; // UUID as a string
    applicationStatus: ApplicationStatus;
    newActionsNumber: number;
}