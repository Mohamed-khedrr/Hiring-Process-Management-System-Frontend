import { Question } from "./Question"

export interface JobSettingRequest {
    jobPostId: string,
    questionDtos: Array<Question>,
    maxApplication: number,
    gender: string,
    educationLevel: string,
    selectedTeamMembers: Array<any>,
    publish: boolean
}