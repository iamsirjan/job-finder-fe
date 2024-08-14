import * as Yup from 'yup';
import { OrganizationTypeEnum } from 'pages/Register/OrganizationRegistration/firstStep/interface';
import { AvailableTypeEnum } from 'pages/Register/TeacherRegistration/firstStep/constant';

// Combined Validation Schema
export const CombinedFormValidation = Yup.object().shape({
  user: Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Please enter a valid email'),
    address: Yup.string().required('Address is required'),
    password: Yup.string().required('Password is required'),
    confirm_password: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
    user_type: Yup.string().required('User type is required'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^\d{10}$/, 'Phone number must be 10 digits long'),
  }),
  teacher: Yup.object().shape({
    first_name: Yup.string().trim().required('First name is required'),
    last_name: Yup.string().trim().required('Last name is required'),
    middle_name: Yup.string().trim(),
    gender: Yup.string().required('Gender is required'),
    date_of_birth: Yup.string().required('Date of birth is required'),
    experience_in_years: Yup.string().trim().required('Experience is required'),
    salary_per_period: Yup.string()
      .trim()
      .required('Salary per period is required'),
    no_of_periods: Yup.number().min(1, 'Number of periods cannot be 0'),
    district: Yup.string().required('District is required'),
    municipality: Yup.string().required('Municipality is required'),
    province: Yup.string().required('Province is required'),
  }),
});

// Combined Default Values
export const CombinedDefaultValues = {
  user: {
    email: '',
    address: '',
    password: '',
    confirm_password: '',
    user_type: '3',
    phone: '',
  },
  teacher: {
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
    lodging: false,
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
  },
};
