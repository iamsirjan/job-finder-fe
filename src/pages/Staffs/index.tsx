import { useEffect, useState } from 'react';
import {
  Flex,
  Text,
  useDisclosure,
  Select,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Wrapper from '../../wrapper';
import {
  useGetVacancyListORG,
  useSendOffer,
} from 'service/vacancy/service-vacancy';
import { useGetAllTeacherDetails } from 'service/service-teacher-register';
import ModalComponent from 'components/modal';
import FormField from 'components/form/FormField';
import FormFooterButton from 'components/form/FormButton';
import StaffCard from 'components/StaffCard';
import { useJobFilter } from './state';
import FilterJob from './filter';
import { useCommonStore } from 'state/common.state';
import { useLocation } from 'react-router-dom';

interface IFormInput {
  vacancy: string;
}

const Staffs = () => {
  const { jobFilter, removeJobFilter } = useJobFilter();
  const drawer = useCommonStore();
  const staffs = useGetAllTeacherDetails({
    grade:
      jobFilter
        .filter((data) => data.key === 'grade')
        .map((data) => data.value) ?? [],
    subject:
      jobFilter
        .filter((data) => data.key === 'subject')
        .map((data) => data.value) ?? [],
    search: drawer.search,
  });

  const vacancy = useGetVacancyListORG();
  const sendOffer = useSendOffer();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [teacherId, setTeacherID] = useState('');
  const location = useLocation();

  useEffect(() => {
    useCommonStore.getState().setSearch('');
  }, [location.pathname]);

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
      <Flex gap={3} my={4}>
        {jobFilter.map((data, i) => (
          <Tag key={i} size="lg" colorScheme="red" borderRadius="full">
            <TagLabel fontWeight={600}>{data.key}: &nbsp; </TagLabel>
            <TagLabel>{data.label}</TagLabel>
            <TagCloseButton
              onClick={() => removeJobFilter(data.value, data.key)}
            />
          </Tag>
        ))}
      </Flex>
      <Flex gap={2} flexWrap={'wrap'}>
        {staffs.data?.data.data.map((data) => (
          <StaffCard
            key={data.user_profile.id}
            address={data.user_profile.user_details.address}
            img={data.user_profile.profile_picture}
            salary={data.teacher.salary_per_period}
            job_from_time={data.teacher.period_from_time}
            job_to_time={data.teacher.period_to_time}
            jobType={data.teacher.available_time}
            id={data.user_profile.id}
            subject={data.teacher.subject.map((data) => data.name)}
            classes={data.teacher.grade.map((data) => data.name)}
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
                <option key={data.id} value={data.id}>
                  {data.name}
                </option>
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
      <FilterJob
        isOpen={drawer.isDrawerOpen}
        onClose={() => useCommonStore.getState().setDrawer(false)}
      />
    </Wrapper>
  );
};

export default Staffs;
