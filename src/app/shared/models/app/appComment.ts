import { AppCommentType } from "./AppCommentType";

export interface AppComment {
    id?: string;
    applicationId: string;
    type: AppCommentType;
    content: string;
    creatorId ?: string ;
    createdAt ?: string ;
    creatorPhoto ?:string ;
    creatorName?:string ;
}
