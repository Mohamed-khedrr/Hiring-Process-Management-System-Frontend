import { AssessmentStatus } from './AssessmentStatus';
import { TechnicalType } from './TechnicalType';

export interface Assessment {
    id?: string;
    title: string;
    link: string;
    technicalType: TechnicalType;
    result: string;
    applicationId: string; // UUID as a string
    availableTill: string; // ISO 8601 date string
    duration: string;
    status: AssessmentStatus;
    createdAt?: string;
    createdBy?: string
    assessmentStatus?: AssessmentStatus;
}
