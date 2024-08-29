import { SocialLink } from "../common/SocialIcon";

export interface CompanyAboutInfoRequest {
  about: string;
  website: string;
  foundingDate: string;
  socialLinks: SocialLink[];
}
