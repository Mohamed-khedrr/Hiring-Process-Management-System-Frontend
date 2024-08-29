// Model for request body
export interface CareerInterestDataModel {
  careerLevel: string;
  minimumSalaryValue: string;
  minimumSalaryCurrency: string;
  showMinimumSalary: boolean;
  jobsTypesUserInterestedIn: string[];
  jobsUserInterestedIn: string[];
  jobStatus: string;
  openToSuggest: boolean;
  searchable: boolean;
}
