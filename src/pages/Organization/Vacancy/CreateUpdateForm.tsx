import {
  Input,
  Switch,
  VStack,
  Select as SelectInput,
  Flex,
} from '@chakra-ui/react';
import FormField from 'components/form/FormField';
import { useFormContext } from 'react-hook-form';
import { IvacancyRequest } from './interface';
import { useGetAllSubjectList } from 'service/master/service-subject';
import FrameWorkDropdown from 'components/select';
import { useMemo } from 'react';
import {
  AvailableTime,
  AvailableTypeEnum,
} from 'pages/Register/TeacherRegistration/firstStep/constant';
import { useGetAllGradeList } from 'service/master/service-grade';
import { useGetAllDegreeList } from 'service/master/service-degree';

const CreateUpdateForm = () => {
  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<IvacancyRequest>();

  const grade = useGetAllGradeList();
  const subject = useGetAllSubjectList();
  const degree = useGetAllDegreeList();

  const allGrade = useMemo(() => {
    return grade.data?.map((grade) => ({
      value: grade.id,
      label: grade.name,
    }));
  }, [grade]);

  const allSubject = useMemo(() => {
    return subject.data?.map((subject) => ({
      value: subject.id,
      label: subject.name,
    }));
  }, [subject]);

  const gradeSel = watch('grade');
  const subjectSel = watch('subject');

  const selectedGrades = useMemo(() => {
    return grade.data
      ?.filter((grade) => gradeSel?.includes(grade.id))
      .map((grade) => ({ label: grade.name, value: grade.id }));
  }, [gradeSel, grade]);

  const selectedSubjects = useMemo(() => {
    return subject.data
      ?.filter((subject) => subjectSel?.includes(subject.id))
      .map((subject) => ({ label: subject.name, value: subject.id }));
  }, [subjectSel, subject]);

  return (
    <VStack gap={4}>
      <FormField label="Grade" error={errors.grade?.message}>
        <FrameWorkDropdown
          options={allGrade}
          isLoading={false}
          isMulti
          value={selectedGrades}
          onChange={(selectedOptions) => {
            const selectedValues = selectedOptions?.map(
              (option) => option.value,
            );
            setValue('grade', selectedValues, { shouldDirty: true });
            trigger('grade');
          }}
          placeholder={'Select Grades'}
        />
      </FormField>

      <FormField label="Subject" error={errors.subject?.message}>
        <FrameWorkDropdown
          options={allSubject}
          isLoading={false}
          isMulti
          value={selectedSubjects}
          onChange={(selectedOptions) => {
            const selectedValues = selectedOptions?.map(
              (option) => option.value,
            );
            setValue('subject', selectedValues, { shouldDirty: true });
            trigger('subject');
          }}
          placeholder={'Select Subject'}
        />
      </FormField>
      <FormField
        label="Minumun Qualification"
        error={errors.qualification?.message}
      >
        <SelectInput {...register('qualification')} placeholder="Select option">
          {degree.data?.map((data) => (
            <option value={data.id}>{data.name}</option>
          ))}
        </SelectInput>
      </FormField>
      <FormField
        label="No of Applicants"
        error={errors.no_of_applications?.message}
      >
        <Input {...register('no_of_applications')} size={'md'} type="number" />
      </FormField>

      <Flex justifyContent={'space-between'} w={'100%'} gap={2}>
        <FormField label="Vacancy Open Date" error={errors.from_date?.message}>
          <Input
            {...register('from_date')}
            name="from_date"
            size={'md'}
            type="date"
          />
        </FormField>

        <FormField label="Vacancy Closing Date" error={errors.to_date?.message}>
          <Input
            type="date"
            {...register('to_date')}
            name="to_date"
            size={'md'}
          />
        </FormField>
      </Flex>
      <FormField label="Available Time" error={errors.job_type?.message}>
        <SelectInput {...register('job_type')} placeholder="Select option">
          {AvailableTime?.map((data) => (
            <option value={data.value}>{data.label}</option>
          ))}
        </SelectInput>
      </FormField>

      <FormField
        label="Salary Per Period"
        error={errors.salary_per_period?.message}
      >
        <Input
          {...register('salary_per_period')}
          name="salary_per_period"
          size={'md'}
          type="number"
        />
      </FormField>

      {watch('job_type') === AvailableTypeEnum.PARTTIME && (
        <Flex justifyContent={'space-between'} w={'100%'} gap={2}>
          <FormField
            label="Period Start Time"
            error={errors.job_from_time?.message}
          >
            <Input
              {...register('job_from_time')}
              name="job_from_time"
              size={'md'}
              type="time"
            />
          </FormField>

          <FormField label="period To Time" error={errors.job_to_time?.message}>
            <Input
              type="time"
              {...register('job_to_time')}
              name="job_to_time"
              size={'md'}
            />
          </FormField>
        </Flex>
      )}
      <Flex justifyContent={'space-between'} w={'100%'}>
        <FormField label="Lodging?">
          <Switch size="sm" {...register('lodging')} />
        </FormField>
        <FormField label="Fooding?">
          <Switch size="sm" {...register('fooding')} />
        </FormField>
      </Flex>
      <FormField label="Allow Fresher?">
        <Switch size="sm" {...register('allow_fresher')} />
      </FormField>
      {!watch('allow_fresher') && (
        <FormField
          label="Experience in Year"
          error={errors.experience_in_years?.message}
        >
          <Input
            {...register('experience_in_years')}
            size={'md'}
            type="number"
          />
        </FormField>
      )}
    </VStack>
  );
};

export default CreateUpdateForm;
