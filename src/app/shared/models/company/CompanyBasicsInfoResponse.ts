import { Location } from "../common/Location";

export interface CompanyBasicsInfoResponse {
  imageUrl: string;
  name: string;
  tagline: string;
  mainBranchLocation: Location;
  industry: string;
  rank?: number;
  companySize: string;
  subscribersNumber?: number;
  isSubscribe?: boolean;
  profileImage: string;
  coverImage: string;
}
