import { Box, Button } from '@chakra-ui/react';
import { FormWrapper } from 'components/form/FormWrapper';
import { ISecondStep } from './interface';
import { DefaultValues, FormValidation } from './ constant';
import Form from './form';
import { useRegisterTeacherStepSecond } from 'service/service-teacher-register';

const SecondStep = () => {
  const register = useRegisterTeacherStepSecond();

  const handleSubmit = async (data: ISecondStep) => {
    const formData = new FormData();

    data.subject.forEach((subject: string) => {
      formData.append('subject', subject);
    });

    data.grade.forEach((grade: string) => {
      formData.append('grade', grade);
    });

    data.degree.forEach((degree: string) => {
      formData.append('degree', degree);
    });

    data.documents.forEach((file: File) => {
      formData.append('documents', file);
    });

    await register.mutateAsync(formData);
  };

  return (
    <Box>
      <FormWrapper<ISecondStep>
        defaultValues={DefaultValues}
        validationSchema={FormValidation}
        onSubmit={handleSubmit}
      >
        <Form />
        <Button type="submit" mt={5} width={'100%'}>
          Next
        </Button>
      </FormWrapper>
    </Box>
  );
};

export default SecondStep;
