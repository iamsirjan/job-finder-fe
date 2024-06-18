import { OrganizationTypeEnum } from 'pages/Register/OrganizationRegistration/firstStep/interface';
import { AvailableTypeEnum } from './constant';

export type IFirstStep = {
  user?: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: string;
  date_of_birth: Date;
  experience_in_years: string;
  expected_salary_low: string;
  expected_salary_high: string;
  can_shift_location: boolean;
  is_available: boolean;
  interested_organization: OrganizationTypeEnum;
  lodging: boolean;
  fooding: boolean;
  is_available_for_tution: boolean;
  available_time: AvailableTypeEnum;
  no_of_periods: number;
  salary_per_period: string;
  period_from_time: string;
  period_to_time: string;
  district: string;
  province: string;
  municipality: string;
};
