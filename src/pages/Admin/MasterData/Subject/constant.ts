import { object, string } from 'yup';

export const SubjectFormValidation = object().shape({
  name: string()
    .required('Subject name is required')
    .max(250, 'Max characters allowed are 250')
    .trim(),
});

export const SubjectDefaultValues = {
  name: '',
};
