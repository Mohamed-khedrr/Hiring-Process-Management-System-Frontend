import { CompanyAboutInfoResponse } from "./CompanyAboutInfoResponse";
import { CompanyBasicsInfoResponse } from "./CompanyBasicsInfoResponse";

export interface AllCompanyInfoDto {
  basicInfoDto: CompanyBasicsInfoResponse;
  aboutInfoDto: CompanyAboutInfoResponse;
  jobPosts : any;
  isComplete: boolean;
}
