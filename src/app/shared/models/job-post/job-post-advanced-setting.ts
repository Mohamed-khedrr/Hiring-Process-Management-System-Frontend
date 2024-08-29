import { Question } from '../company/Question';
import { PostAdminData } from './post-admin-data';

export interface JobPostAdvancedSetting {
  title: string;
  jobPostId: string;
  companyId: string;
  creatorId: string;
  questionDtos: Question[];
  maxApplication: number;
  gender: string;
  educationLevel: string;
  admin: PostAdminData;
  selectedTeamMembers: PostAdminData[];
  companyTeamMembers: PostAdminData[];
  publish: boolean;
  open: boolean;
}
