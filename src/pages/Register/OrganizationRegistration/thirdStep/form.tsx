import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { CourseDetail, IOrgThirdStep } from './interface';
import { Button, HStack, Input, Select, VStack } from '@chakra-ui/react';
import FormField from 'components/form/FormField';
import PillButton from 'pages/Register/TeacherRegistration/secondStep/pill';
import { useGetAllGradeList } from 'service/master/service-grade';
import { useState } from 'react';
import CourseTable from './table';

const Form = () => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<IOrgThirdStep>();
  const [courseState, setCourseState] = useState<CourseDetail[]>([]);
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'courses',
  });
  const grade = useGetAllGradeList();

  const selectedGradeIds = watch('gradeSelect') as string[];
  const gradeSelected = grade.data?.filter((data) =>
    selectedGradeIds.includes(data.id),
  );

  const addCourse = () => {
    const newCourse = watch(`courses.${fields.length - 1}`);
    setCourseState([...courseState, newCourse]);
    append({ grade: '', name: '', duration: '', price: '' });
  };

  console.log(courseState);

  const handleDelete = (index: number) => {
    setCourseState(courseState.filter((_, i) => i !== index));
    remove(index);
  };

  return (
    <VStack gap={5}>
      {courseState.length && (
        <CourseTable courses={courseState} onDelete={handleDelete} />
      )}
      <FormField label="Grade" error={errors.gradeSelect?.message}>
        <Controller
          name="gradeSelect"
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
      {fields.length === courseState.length + 1 &&
        fields.map(
          (field, index) =>
            index === courseState.length && (
              <VStack key={field.id} gap={3} w="100%">
                <FormField
                  label="Grade"
                  error={errors.courses?.[index]?.grade?.message}
                >
                  <Select
                    {...register(`courses.${index}.grade`)}
                    placeholder="Select option"
                  >
                    {gradeSelected?.map((data) => (
                      <option key={data.id} value={data.id}>
                        {data.name}
                      </option>
                    ))}
                  </Select>
                </FormField>
                <FormField
                  label="Course Name"
                  error={errors.courses?.[index]?.name?.message}
                >
                  <Input
                    {...register(`courses.${index}.name`)}
                    name={`courses.${index}.name`}
                    size={'md'}
                  />
                </FormField>
                <HStack gap={2} w="100%">
                  <FormField
                    label="Duration (hr)"
                    error={errors.courses?.[index]?.duration?.message}
                  >
                    <Input
                      {...register(`courses.${index}.duration`)}
                      name={`courses.${index}.duration`}
                      size={'md'}
                      type="number"
                    />
                  </FormField>
                  <FormField
                    label="Price"
                    error={errors.courses?.[index]?.price?.message}
                  >
                    <Input
                      {...register(`courses.${index}.price`)}
                      name={`courses.${index}.price`}
                      size={'md'}
                      type="number"
                    />
                  </FormField>
                </HStack>
                <Button variant="danger" w="100%" onClick={() => remove(index)}>
                  Remove Course
                </Button>
              </VStack>
            ),
        )}
      <Button w="100%" variant="outline" onClick={addCourse}>
        Add Another Course
      </Button>
    </VStack>
  );
};

export default Form;
