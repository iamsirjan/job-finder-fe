import { useState } from 'react';
import { Flex, Text, useDisclosure, Textarea } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import CardComponent from 'components/card';
import Wrapper from '../../wrapper';
import {
  useApplyVacancy,
  useGetVacancyList,
} from 'service/vacancy/service-vacancy';
import { useGetTeacherDetails } from 'service/service-teacher-register';
import ModalComponent from 'components/modal';
import FormField from 'components/form/FormField';
import FormFooterButton from 'components/form/FormButton';

interface IFormInput {
  coverLetter: string;
}

const Home = () => {
  const vacancy = useGetVacancyList();
  const teacher = useGetTeacherDetails();
  const applyVacancy = useApplyVacancy();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [vacancyId, setVacancyID] = useState('');

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await applyVacancy.mutateAsync({
      cover_letter: data.coverLetter,
      cv: teacher.data?.data.data.cv[0].id.toString() ?? '',
      teacher: [teacher.data?.data.data.user_profile.id.toString() ?? ''],
      vacancy: vacancyId,
    });

    reset();
    onClose();
  };

  const handleRequest = (id: string) => {
    setVacancyID(id);
    onOpen();
  };

  return (
    <Wrapper>
      <Flex gap={2} flexWrap={'wrap'}>
        {vacancy.data?.data.data?.map((data) => (
          <CardComponent
            address={data.organization_full_detail.organization_detail.address}
            img={data.organization_full_detail.organization_detail.profile_pic}
            classes={data.grade}
            id={data.id}
            subject={data.subject}
            name={data.organization_full_detail.organization_detail.name}
            handleSendRequest={handleRequest}
          />
        ))}
      </Flex>

      <ModalComponent
        heading={<Text>Send Cover Letter</Text>}
        onClose={onClose}
        isOpen={isOpen}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField label="Cover letter">
            <Textarea
              rows={6}
              placeholder="Enter your cover letter"
              {...register('coverLetter', {
                required: 'Cover letter is required',
              })}
            />
            {errors.coverLetter && (
              <Text color="red.500">{errors.coverLetter.message}</Text>
            )}
          </FormField>
          <Flex justifyContent="flex-end" mt={4}>
            <FormFooterButton
              isCreateFlow={true}
              handleCancelClick={onClose}
              isFormSubmitting={isSubmitting}
            />
          </Flex>
        </form>
      </ModalComponent>
    </Wrapper>
  );
};

export default Home;
