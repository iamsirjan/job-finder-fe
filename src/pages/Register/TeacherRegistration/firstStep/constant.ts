import { object, string } from 'yup';
export const FormValidation = object().shape({
  first_name: string().trim().required('first name is required'),
  last_name: string().trim().required('last name is required'),
  middle_name: string().trim(),
  gender: string().required('gender is required'),
  date_of_birth: string().required('date of birth is required'),
  experience_in_years: string().trim().required('experience is required'),
  expected_salary_low: string()
    .trim()
    .required('expected salary(low) is required'),
  expected_salary_high: string()
    .trim()
    .required('expected salary(high) is required'),
});

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
};

export const GENDER = [
  {
    value: '1',
    label: 'Male',
  },
  { value: '2', label: 'Female' },
  { value: '3', label: 'Other' },
];
