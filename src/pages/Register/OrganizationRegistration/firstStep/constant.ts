import { object, string } from 'yup';
import * as Yup from 'yup';
import { OrganizationTypeEnum } from './interface';

export const FormValidation = object().shape({
  name: string().trim().required('name is required'),
  phone_number: Yup.string()
    .required('Phone number is required')
    .matches(/^\d{10}$/, 'Phone number must be 10 digits long'),
  pan_number: string().trim().required('pan number is required'),
  organization_type: Yup.string().required('Organization type is required'),
  web_site_link: string().trim().required('organization website is requried'),
  address: string().trim().required('address is required'),
});

export const DefaultValues = {
  name: '',
  phone_number: '',
  pan_number: '',
  organization_type: OrganizationTypeEnum.PRIVATE,
  web_site_link: '',
  address: '',
};

export const OrganizationTypes = [
  { value: OrganizationTypeEnum.PRIVATE, label: 'Private' },
  { value: OrganizationTypeEnum.PUBLIC, label: 'Public' },
  { value: OrganizationTypeEnum.MIXED, label: 'Mixed' },
  { value: OrganizationTypeEnum.OTHERS, label: 'Others' },
];
