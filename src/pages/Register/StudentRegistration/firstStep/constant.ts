import { object, string } from 'yup';

export const FormValidation = object().shape({
  first_name: string().trim().required('first step is required'),
  last_name: string().trim().required('last name is required'),
  gender: string().required('gender is required'),
  date_of_birth: string().required('date of birth is required'),
});

export const DefaultValues = {
  first_name: '',
  middle_name: '',
  last_name: '',
  gender: '',
  date_of_birth: undefined,
};
