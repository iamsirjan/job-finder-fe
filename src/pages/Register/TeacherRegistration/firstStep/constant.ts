import { OrganizationTypeEnum } from 'pages/Register/OrganizationRegistration/firstStep/interface';
import { number, object, string } from 'yup';
export const FormValidation = object().shape({
  first_name: string().trim().required('first name is required'),
  last_name: string().trim().required('last name is required'),
  middle_name: string().trim(),
  gender: string().required('gender is required'),
  date_of_birth: string().required('date of birth is required'),
  experience_in_years: string().trim().required('experience is required'),
  salary_per_period: string().trim().required('salary per period is required'),
  no_of_periods: number().min(1, 'no of periods cannot be 0'),
  district: string().required('district is required'),
  municipality: string().required('municipality is required'),
  province: string().required('province is required'),
});

export enum AvailableTypeEnum {
  FULLTIME = '1',
  PARTTIME = '2',
}
export const DefaultValues = {
  first_name: '',
  middle_name: '',
  last_name: '',
  gender: '',
  date_of_birth: undefined,
  experience_in_years: '',
  expected_salary_low: '',
  expected_salary_high: '',
  can_shift_location: false,
  is_available: false,
  fooding: false,
  loding: false,
  is_available_for_tuition: false,
  interested_organization: OrganizationTypeEnum.PRIVATE,
  available_time: AvailableTypeEnum.FULLTIME,
  no_of_periods: 0,
  salary_per_period: '',
  period_from_time: '',
  period_to_time: '',
  district: '',
  municipality: '',
  province: '',
};

export const GENDER = [
  {
    value: '1',
    label: 'Male',
  },
  { value: '2', label: 'Female' },
  { value: '3', label: 'Other' },
];

export const AvailableTime = [
  { value: AvailableTypeEnum.FULLTIME, label: 'Full Time' },
  { value: AvailableTypeEnum.PARTTIME, label: 'Part Time' },
];
