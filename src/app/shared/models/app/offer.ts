import { OfferComment } from './offerComment';
import { OfferStatus } from "./OfferStatus";

export interface Offer {
    id?: string; // UUID as a string
    deadlineAt: string; // ISO 8601 date string
    applicationId: string; // UUID as a string
    status: OfferStatus;
    documentByCompany?: string;
    documentByJobSeeker?: string;
    createdAt?: string;
    createdBy?: string;
    comments?:OfferComment[];
}
