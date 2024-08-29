import { CertificateData } from './complete-profile/certificateData';
import { EducationData } from './complete-profile/education-data';
import { JobExperienceModel } from './complete-profile/job-experience-model';
import { LanguageData } from './complete-profile/language-data';

export interface AllJobseekerProfileInfo {
  firstName: string;
  lastName: string;
  mobileNumberCountryCode: string;
  mobileNumber: string;
  jobTitle: string;
  createdDate: string;
  birthDate: string;
  gender: string;
  profilePhoto: string;
  livesIn: {
    id?: number;
    country: string;
    state: string;
    city: string;
  };
  readyToRelocate: boolean;
  yearsOfExperience: string;
  careerLevel: string;
  minimumSalaryValue: string;
  minimumSalaryCurrency: string;
  showMinimumSalary: boolean;
  jobsTypesUserInterestedIn: string[];
  jobsUserInterestedIn: string[];
  jobStatus: string;
  searchable: boolean;
  openToSuggest: boolean;
  jobExperiences: Array<JobExperienceModel>;
  educations: Array<EducationData>;
  certificates: Array<CertificateData>;
  skills: Array<string>;
  languages: Array<LanguageData>;
  about: string;
  facebookLink: string;
  linkedinLink: string;
  githubLink: string;
  nationality: string;
  cv: string;
  username: string;
}
