import { Role } from "../auth/Role";

export interface OfferCommentInfo {
    id: string; // UUID as a string
    createdAt: string; // ISO 8601 date string
    updatedAt: string; // ISO 8601 date string
    creatorId: string; // UUID as a string
    creatorRole: Role;
    content: string;
}