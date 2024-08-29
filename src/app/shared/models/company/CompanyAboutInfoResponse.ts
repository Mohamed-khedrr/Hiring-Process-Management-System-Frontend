import { SocialLink } from '../common/SocialIcon';
import { Benefit } from './Benefit';

export interface CompanyAboutInfoResponse {
  about: string;
  website: string;
  foundingDate: string;
  socialLinks: SocialLink[];
  companyBenefits: Benefit[];
}
