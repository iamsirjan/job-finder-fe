import * as yup from 'yup';

export const DefaultValues = {
  profile_picture: undefined,
};
export const FormValidation = yup.object().shape({
  profile_picture: yup.mixed(),
});
