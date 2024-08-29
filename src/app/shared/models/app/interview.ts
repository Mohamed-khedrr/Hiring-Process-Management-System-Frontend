import { InterviewStatus } from "./InterviewStatus";
import { TechnicalType } from "./TechnicalType";

export interface  Interview {
    id?: string;
    title: string;
    link: string;
    technicalType: TechnicalType;
    result: string;
    applicationId: string; // UUID as a string
    startTime: string; // ISO 8601 date string
    endTime: string; // ISO 8601 date string
    status: InterviewStatus;

    // just in response
    createdAt?: string;
    createdBy?: string;
    interviewStatus?:InterviewStatus
}


