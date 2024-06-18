import * as yup from 'yup';

export const DefaultValues = {
  profile_pic: undefined,
};
export const FormValidation = yup.object().shape({
  profile_pic: yup.mixed(),
});
