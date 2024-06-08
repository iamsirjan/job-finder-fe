import { Controller, useFormContext } from 'react-hook-form';
import { ISecondStep } from './interface';
import { HStack, VStack } from '@chakra-ui/react';
import FormField from 'components/form/FormField';
import { useGetAllDegreeList } from 'service/master/service-degree';
import { useGetAllSubjectList } from 'service/master/service-subject';
import { useGetAllGradeList } from 'service/master/service-grade';
import PillButton from './pill';
import FileDropzone from 'components/form/Dropzone';

const Form = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ISecondStep>();

  const degree = useGetAllDegreeList();
  const subject = useGetAllSubjectList();
  const grade = useGetAllGradeList();
  return (
    <VStack gap={4}>
      <FormField label="Degree" error={errors.degree?.message}>
        <Controller
          name="degree"
          control={control}
          render={({ field }) => (
            <HStack mt={0}>
              <PillButton
                values={degree.data?.map((data) => data) || []}
                onChange={(selectedValues) => field.onChange(selectedValues)}
              />
            </HStack>
          )}
        />
      </FormField>
      <FormField label="Subject" error={errors.subject?.message}>
        <Controller
          name="subject"
          control={control}
          render={({ field }) => (
            <HStack mt={0}>
              <PillButton
                values={subject.data?.map((data) => data) || []}
                onChange={(selectedValues) => field.onChange(selectedValues)}
              />
            </HStack>
          )}
        />
      </FormField>

      <FormField label="Grade" error={errors.grade?.message}>
        <Controller
          name="grade"
          control={control}
          render={({ field }) => (
            <HStack mt={0}>
              <PillButton
                values={grade.data?.map((data) => data) || []}
                onChange={(selectedValues) => field.onChange(selectedValues)}
              />
            </HStack>
          )}
        />
      </FormField>
      <FormField label="Upload Files" error={errors.documents?.message}>
        <Controller
          name="documents"
          control={control} // 'control' is from useFormContext()
          render={({ field }) => (
            <FileDropzone name="documents" field={field} />
          )}
        />
      </FormField>
    </VStack>
  );
};

export default Form;
