import { ApplicationStatus } from "./ApplicationStatus";
import { TimelineEventType } from "./TimelineEventType";

export interface TimelineEventResponse {
    id: string; // UUID as a string
    createdAt: string; // ISO 8601 date string
    updatedAt: string; // ISO 8601 date string
    type: TimelineEventType;
    creatorId: string; // UUID as a string
    creatorName: string;
    creatorPhoto: string;
    applicationStatus: ApplicationStatus
    content: any;
}