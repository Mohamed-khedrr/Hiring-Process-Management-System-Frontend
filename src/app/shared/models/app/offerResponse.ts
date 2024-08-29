import { OfferStatus } from "./OfferStatus";
import { OfferCommentInfo } from "./offerCommentInfo";

export interface OfferResponse {
    id: string; // UUID as a string
    createdAt: string; // ISO 8601 date string
    updatedAt: string; // ISO 8601 date string
    deadlineAt: string; // ISO 8601 date string
    documentByCompany: string;
    documentByJobSeeker: string;
    status: OfferStatus;
    applicationId: string; // UUID as a string
    comments: OfferCommentInfo[]; // List of OfferCommentInfo
    sizeOfDocumentByCompany: number;
    sizeOfDocumentByJobSeeker: number;
    createdBy: string;
}