import { VacancyStatus } from 'service/service-offer-org';
import * as yup from 'yup';

export const StatusValidation = yup.object().shape({
  status: yup.string().required('Status is required'),
  message: yup
    .string()
    .trim()
    .when('status', {
      is: VacancyStatus.REJECTED,
      then: (schema) =>
        schema.required('Message is required when status is rejected'),
      otherwise: (schema) => schema.notRequired(),
    }),

  date: yup.string().when('status', {
    is: VacancyStatus.APPROVED,
    then: (schema) =>
      schema.required('Date is required when status is approved'),
    otherwise: (schema) => schema.notRequired(),
  }),

  time: yup.string().when('status', {
    is: VacancyStatus.APPROVED,
    then: (schema) =>
      schema.required('Time is required when status is approved'),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export const StatusDefaultValue = {
  message: '',
  status: VacancyStatus.PENDING,
  date: '',
  time: '',
};

export interface IStatusChange {
  message: string;
  status: VacancyStatus;
  date: string;
  time: string;
}

export const StatusOption = [
  { value: VacancyStatus.APPROVED, label: 'Approved' },
  { value: VacancyStatus.HIRED, label: 'Hired' },
  { value: VacancyStatus.PENDING, label: 'Pending' },
  { value: VacancyStatus.REJECTED, label: 'Rejected' },
];
