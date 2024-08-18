import { useEffect, useState } from 'react';
import {
  Flex,
  Text,
  useDisclosure,
  Textarea,
  Button,
  Box,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react';
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
import { useGetUserDetails } from 'service/service-user';
import { useGetMatchingVacancyList } from 'service/service-matching-vacancy';
import FilterJob from './filter';
import { useJobFilter } from './state';
import { useCommonStore } from 'state/common.state';
import { useLocation } from 'react-router-dom';

interface IFormInput {
  coverLetter: string;
}

const Home = () => {
  const drawer = useCommonStore();
  const teacher = useGetTeacherDetails();
  const [allJobs, setAllJobs] = useState(true);
  const [matchingJobs, setMatchingJobs] = useState(false);
  const applyVacancy = useApplyVacancy();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [vacancyId, setVacancyID] = useState('');
  const user = useGetUserDetails();
  const { jobFilter, removeJobFilter } = useJobFilter();
  const location = useLocation();

  const allVacancy = useGetVacancyList({
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
  const matchingVacancy = useGetMatchingVacancyList();
  const vacancy = allJobs
    ? (allVacancy?.data as any)
    : (matchingVacancy?.data?.data as any);

  useEffect(() => {
    useCommonStore.getState().setSearch('');
  }, [location.pathname]);

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
      teacher: teacher.data?.data.data.user_profile.id.toString() ?? '',
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
      <Box>
        <Flex justifyContent={'flex-end'} gap={2} alignItems={'center'}>
          {user.data?.is_teacher && (
            <>
              <Button
                variant={allJobs ? 'primary' : 'outline'}
                onClick={() => {
                  setAllJobs(!allJobs);
                  setMatchingJobs(false);
                }}
              >
                Show All Jobs
              </Button>
              <Button
                variant={matchingJobs ? 'primary' : 'outline'}
                onClick={() => {
                  setMatchingJobs(!matchingJobs);
                  setAllJobs(false);
                }}
              >
                Show Matching Jobs
              </Button>
            </>
          )}
        </Flex>
      </Box>
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

      <Flex gap={3} flexWrap={'wrap'}>
        {vacancy &&
          vacancy?.map((data: any) => {
            return (
              <CardComponent
                key={data.id}
                address={data.organization.organization_detail.address}
                img={data.organization.organization_detail.profile_pic}
                classes={data.grade}
                showApply={user.data?.is_teacher}
                id={data.id}
                subject={data.subject}
                salary={data.salary_per_period}
                job_from_time={data.job_from_time}
                job_to_time={data.job_to_time}
                jobType={data.job_type}
                name={data.organization.organization_detail.name}
                handleSendRequest={handleRequest}
              />
            );
          })}
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
      <FilterJob
        isOpen={drawer.isDrawerOpen}
        onClose={() => useCommonStore.getState().setDrawer(false)}
      />
    </Wrapper>
  );
};

export default Home;
