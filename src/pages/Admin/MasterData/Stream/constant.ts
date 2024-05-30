import { object, string } from 'yup';

export const StreamFormValidation = object().shape({
  name: string()
    .required('Stream name is required')
    .max(250, 'Max characters allowed are 250')
    .trim(),

  description: string().trim().required('Stream description is required'),
});

export const StreamDefaultValues = {
  name: '',
  description: '',
};
