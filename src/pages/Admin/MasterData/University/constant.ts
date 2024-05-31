import { object, string } from 'yup';

export const UniversityFormValidation = object().shape({
  name: string()
    .required('Subject name is required')
    .max(250, 'Max characters allowed are 250')
    .trim(),
  location: string().required('Location is required'),
});

export const UniversityDefaultValues = {
  name: '',
  location: '',
};
