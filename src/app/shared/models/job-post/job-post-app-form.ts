import { Question } from '../company/Question';
import { PostAdminData } from './post-admin-data';

export interface JobPostAppForm {
  jobPostId: string;
  jobTitle: string;
  questionDtosList: Question[];
}
