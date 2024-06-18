import { object, string } from 'yup';

export const DegreeFormValidation = object().shape({
  name: string()
    .required('Stream name is required')
    .max(250, 'Max characters allowed are 250')
    .trim(),
});

export const DegreeDefaultValues = {
  name: '',
};
