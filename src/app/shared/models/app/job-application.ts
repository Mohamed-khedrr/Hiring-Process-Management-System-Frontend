import { EducationData } from '../job-seeker/complete-profile/education-data';

export interface JobApplication {
  id: string;
  applicantId: string;
  applicantFirstName: string;
  applicantLastName: string;
  profilePhoto: string;
  applicantJobTitle: string | null;
  applicantCareerLevel: string | null;
  applicantEducations: EducationData[];
  viewed: boolean;
  status : string;
  applicantLocation: {
    id: string;
    country: string;
    state: string;
    city: string;
    latitude: string;
    longitude: string;
  };
}
