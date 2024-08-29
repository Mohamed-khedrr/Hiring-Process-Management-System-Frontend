export interface JobSeekerBasicInfomation {
  firstName: string;
  lastName: string;
  mobileNumberCountryCode: string;
  mobileNumber: string;
  birthDate: string; // Assuming it's a string formatted as "2024-01-25T19:02:47.098Z"
  livesIn: {
    id?: number;
    country: string;
    state: string;
    city: string;
  };
  gender: string;
  about: string;
  facebookLink: string;
  linkedinLink: string;
  githubLink: string;
  readyToRelocate: boolean;
  nationality: string;
}
