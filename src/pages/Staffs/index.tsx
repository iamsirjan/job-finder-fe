import { useState } from 'react';
import { Flex, Text, useDisclosure, Select } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Wrapper from '../../wrapper';
import {
  useGetVacancyList,
  useSendOffer,
} from 'service/vacancy/service-vacancy';
import { useGetAllTeacherDetails } from 'service/service-teacher-register';
import ModalComponent from 'components/modal';
import FormField from 'components/form/FormField';
import FormFooterButton from 'components/form/FormButton';
import StaffCard from 'components/StaffCard';

interface IFormInput {
  vacancy: string;
}

const Staffs = () => {
  const staffs = useGetAllTeacherDetails();
  const vacancy = useGetVacancyList();
  const sendOffer = useSendOffer();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [teacherId, setTeacherID] = useState('');

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await sendOffer.mutateAsync({
      teacher: teacherId,
      vacancy: data.vacancy,
      is_offered: true,
    });

    reset();
    onClose();
  };

  const handleRequest = (id: string) => {
    setTeacherID(id);
    onOpen();
  };

  return (
    <Wrapper>
      <Flex gap={2} flexWrap={'wrap'}>
        {staffs.data?.data.data.map((data) => (
          <StaffCard
            address={data.user_profile.user_details.address}
            img={data.user_profile.profile_picture}
            id={data.user_profile.id}
            subject={data.teacher.subject}
            classes={data.teacher.grade}
            name={
              data.user_profile.first_name + ' ' + data.user_profile.last_name
            }
            handleSendRequest={handleRequest}
          />
        ))}
      </Flex>

      <ModalComponent
        heading={<Text>Request Staffs</Text>}
        onClose={onClose}
        isOpen={isOpen}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField label="Vacancy List">
            <Select {...register('vacancy')} placeholder="Select option">
              {vacancy?.data?.map((data) => (
                <option value={data.id}>{data.subject}</option>
              ))}
            </Select>
            {errors.vacancy && (
              <Text color="red.500">{errors.vacancy.message}</Text>
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

export default Staffs;
