import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { IOrgThirdStep } from './interface';
import {
  Button,
  Divider,
  Flex,
  HStack,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';
import FormField from 'components/form/FormField';
import PillButton from 'pages/Register/TeacherRegistration/secondStep/pill';
import { useGetAllGradeList } from 'service/master/service-grade';
import { useEffect } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';

const Form = ({ data }: { data: IOrgThirdStep }) => {
  const {
    register,
    control,
    reset,
    watch,
    formState: { errors },
  } = useFormContext<IOrgThirdStep>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'courses',
  });
  const grade = useGetAllGradeList();

  const selectedGradeIds = watch('gradeSelect') as string[];
  const gradeSelected = grade.data?.filter((data) =>
    selectedGradeIds?.includes(data.id),
  );

  const addCourse = () => {
    append({ grade: '', name: '', duration: '', price: '' });
  };

  const handleDelete = (index: number) => {
    remove(index);
  };

  console.log(
    grade.data?.filter((data) => selectedGradeIds?.includes(data.id)),
  );
  useEffect(() => {
    if (data) {
      const resetValues = {
        gradeSelect: data?.gradeSelect?.map((data) => data),
        courses: data?.courses?.map((course) => ({
          grade: course.grade ?? '',
          name: course.name ?? '',
          duration: course.duration ?? '',
          price: course.price ?? '',
        })),
      };
      reset(resetValues);
      console.log(resetValues);
    }
  }, [data]);
  return (
    <VStack gap={5}>
      {/* {courseState.length && (
        <CourseTable courses={courseState} onDelete={handleDelete} />
      )} */}
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
      {fields.map((field, index) => (
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
          <Flex justifyContent={'flex-end'} flex={'1'} w={'100%'}>
            {fields.length >= 1 && (
              <DeleteIcon
                cursor={'pointer'}
                color={'red'}
                w="fit-content"
                onClick={() => remove(index)}
              >
                Remove Course
              </DeleteIcon>
            )}
          </Flex>
          <Divider />
        </VStack>
      ))}
      <Button w="fi-content" variant="outline" onClick={addCourse}>
        Add Another Course
      </Button>
    </VStack>
  );
};

export default Form;
