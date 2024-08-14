import {
  Avatar,
  Box,
  Button,
  Flex,
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FaBirthdayCake, FaCheck } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';
import {
  EmailIcon,
  GradeIcon,
  JobType,
  LocationIcon,
  PhoneIcon,
  SalaryIcon,
  SubjectIcon,
  TimeIcon,
  VacancyBanner,
  WebsiteIcon,
} from 'assets';
import Wrapper from 'wrapper';
import {
  useApplyVacancy,
  useGetVacancyListORG,
  useSendOffer,
} from 'service/vacancy/service-vacancy';
import { useParams } from 'react-router-dom';
import { useGetUserDetails } from 'service/service-user';
import { jobTypeMap } from 'pages/Register/TeacherRegistration/firstStep/constant';
import ModalComponent from 'components/modal';
import FormField from 'components/form/FormField';
import FormFooterButton from 'components/form/FormButton';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useGetTeacherDetailsByID } from 'service/service-teacher-register';
import LabelBox from 'components/labelBox';
import { useGetMatchingVacancyList } from 'service/service-matching-vacancy';
import CardComponent from 'components/card';

interface IFormInput {
  vacancy: string;
}

const TeacherDetails = () => {
  const vacancy = useGetVacancyListORG();
  const { id } = useParams<{ id: string }>();
  const [vacancyID, setVacancyID] = useState('');
  const matchingVacancy = useGetMatchingVacancyList(id);
  const teacherDetail = useGetTeacherDetailsByID({
    id: id ?? '',
  });
  const imageURL = import.meta.env.VITE_APP_IMAGE_API;

  const user = useGetUserDetails();
  const sendOffer = useSendOffer();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenApply,
    onOpen: onOpenApply,
    onClose: onCloseApply,
  } = useDisclosure();

  const [teacherId, setTeacherID] = useState('');

  // Initialize React Hook Form for offer submission
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

  const handleRequestApply = (id: string) => {
    setVacancyID(id);

    onOpenApply();
  };

  const applyVacancy = useApplyVacancy();

  const onApply = async () => {
    await applyVacancy.mutateAsync({
      cover_letter: '',
      cv: '',
      teacher: id ?? '',
      vacancy: vacancyID,
    });

    onCloseApply();
  };

  return (
    <Wrapper>
      <Flex direction="column" alignItems="center">
        <VacancyBanner />
        <Avatar
          size="xl"
          src={imageURL + teacherDetail?.data?.user_profile.profile_picture}
          mt={-12}
          mb={4}
        />

        <Box
          w="100%"
          p={4}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Text fontSize="xl" fontWeight="semibold" color="brand.mainBlue">
              {teacherDetail.data?.user_profile.first_name}{' '}
              {teacherDetail.data?.user_profile.last_name}
            </Text>
            {user.data?.is_organization && (
              <Button
                size="sm"
                borderRadius="full"
                colorScheme="blue"
                onClick={() => handleRequest(id ?? '')}
              >
                Request Now
              </Button>
            )}
          </Flex>
          <Flex direction="column" gap={4}>
            <Flex alignItems="center" gap={2}>
              <PhoneIcon height="16px" />
              <Text fontSize="md" color="gray.500">
                {teacherDetail.data?.user_profile.user_details.phone}
              </Text>
            </Flex>
            <Flex alignItems="center" gap={2}>
              <WebsiteIcon height="16px" />
              <Text fontSize="md" color="gray.500">
                {teacherDetail.data?.user_profile.user_details.email}
              </Text>
            </Flex>
            <Flex alignItems="center" gap={2}>
              <EmailIcon height="12px" />
              <Text fontSize="md" color="gray.500">
                {teacherDetail.data?.user_profile.user_details.address}
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Flex>

      <Box
        w="100%"
        p={4}
        mt={4}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Text fontSize={'20px'} fontWeight={'600'} color="brand.mainBlue">
          Bio
        </Text>
        <Text mt={4}>{teacherDetail.data?.teacher.biography}</Text>
      </Box>

      <Box
        w="100%"
        p={4}
        mt={4}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Text fontSize="20px" fontWeight="600" color="brand.mainBlue">
          Teacher Details
        </Text>

        <Flex marginTop={5}>
          <Flex gap={2} alignItems="center" flex={1}>
            <Text fontSize="16px">Gender:</Text>
            <Text fontSize="16px">
              {teacherDetail.data?.user_profile.gender}
            </Text>
          </Flex>
        </Flex>
        <Flex marginTop={5}>
          <Flex gap={2} alignItems="center" flex={1}>
            <FaBirthdayCake />
            <Text fontSize="16px">DOB:</Text>
            <Text fontSize="16px">
              {teacherDetail.data?.user_profile.date_of_birth}
            </Text>
          </Flex>

          <Flex gap={2} alignItems="center" flex={1}>
            <Text fontSize="16px">Experience:</Text>
            <Text fontSize="16px">
              {teacherDetail.data?.teacher.experience_in_years} years
            </Text>
          </Flex>
        </Flex>
      </Box>
      <Box
        w="100%"
        p={4}
        mt={4}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Text fontSize={'20px'} fontWeight={'600'} color="brand.mainBlue">
          Preferences
        </Text>

        <Flex marginTop={5}>
          <Flex alignItems={'center'} gap={2} flex={1}>
            <JobType height={'16px'} />
            <Flex
              bg={'#31883A'}
              borderRadius="8px"
              display="flex"
              alignItems={'center'}
              justifyContent={'center'}
              color={'#fff'}
              fontSize="13px"
              w="67px"
              height="27px"
            >
              {jobTypeMap[teacherDetail.data?.teacher.available_time ?? '1']}
            </Flex>
          </Flex>
        </Flex>
        <Flex marginTop={5} direction={'row'} gap={8} flexWrap={'wrap'}>
          <Flex gap={2} alignItems={'center'} flex={1}>
            <SubjectIcon />
            <LabelBox
              color={'#31883A'}
              items={
                teacherDetail.data?.teacher.subject
                  ? teacherDetail.data?.teacher.subject.map((data) => data.name)
                  : ['']
              }
              bgColor={'#DEFFCA'}
            />
          </Flex>
          <Flex gap={2} alignItems={'center'} flex={2}>
            <GradeIcon />
            <LabelBox
              color={'#EFB92D'}
              items={
                teacherDetail.data?.teacher.grade
                  ? teacherDetail.data?.teacher.grade.map((data) => data.name)
                  : ['']
              }
              bgColor={'#FFF0CA'}
            />
          </Flex>
        </Flex>
        <Flex marginTop={5} gap={8} flexWrap={'wrap'}>
          <Flex gap={2} alignItems={'center'} flex={1}>
            <TimeIcon height={'16px'} />
            {jobTypeMap[teacherDetail.data?.teacher.available_time ?? '1'] ??
            '1' ? (
              <Text fontSize={'16px'}>10AM - 5PM</Text>
            ) : (
              <Text fontSize={'16px'}>
                {teacherDetail.data?.teacher.period_from_time +
                  ' ' +
                  '-' +
                  ' ' +
                  teacherDetail.data?.teacher.period_to_time}
              </Text>
            )}
          </Flex>
          <Flex gap={2} alignItems={'center'} flex={1}>
            <LocationIcon height={'16px'} />
            <Text fontSize={'16px'}>
              {teacherDetail.data?.user_profile.user_details.address}
            </Text>
          </Flex>

          <Flex gap={2} alignItems={'center'} flex={1}>
            <SalaryIcon height="16px" />
            <Text fontSize={'16px'}>
              {teacherDetail.data?.teacher.salary_per_period} Per Period
            </Text>
          </Flex>
        </Flex>
        <Flex marginTop={5} direction={'row'} gap={8} flexWrap={'wrap'}>
          <Flex gap={2} alignItems={'center'} flex={1}>
            {teacherDetail.data?.teacher.lodging ? (
              <FaCheck height={'16px'} color="green" />
            ) : (
              <RxCross1 height={'16px'} color="red" />
            )}

            <Text fontSize={'16px'}>Lodging</Text>
          </Flex>
          <Flex gap={2} alignItems={'center'} flex={1}>
            {teacherDetail.data?.teacher.fooding ? (
              <FaCheck height={'16px'} color="green" />
            ) : (
              <RxCross1 height={'16px'} color="red" />
            )}
            <Text fontSize={'16px'}>Fooding</Text>
          </Flex>

          <Flex gap={2} alignItems={'center'} flex={1}>
            {teacherDetail.data?.teacher.lodging ? (
              <FaCheck height={'16px'} color="green" />
            ) : (
              <RxCross1 height={'16px'} color="red" />
            )}
            <Text fontSize={'16px'}>Freshers</Text>
          </Flex>
        </Flex>

        <Flex marginTop={5} direction={'row'} gap={8} flexWrap={'wrap'}>
          <Flex gap={2} alignItems={'center'} flex={1}>
            {teacherDetail.data?.teacher.can_work_in_city ? (
              <FaCheck height={'16px'} color="green" />
            ) : (
              <RxCross1 height={'16px'} color="red" />
            )}
            <Text fontSize={'16px'}>Village</Text>
          </Flex>
          <Flex gap={2} alignItems={'center'} flex={1}>
            {teacherDetail.data?.teacher.can_work_in_village ? (
              <FaCheck height={'16px'} color="green" />
            ) : (
              <RxCross1 height={'16px'} color="red" />
            )}
            <Text fontSize={'16px'}>City</Text>
          </Flex>

          <Flex gap={2} alignItems={'center'} flex={1}>
            {teacherDetail.data?.teacher.can_shift_location ? (
              <FaCheck height={'16px'} color="green" />
            ) : (
              <RxCross1 height={'16px'} color="red" />
            )}
            <Text fontSize={'16px'}>Can Shift Location</Text>
          </Flex>
        </Flex>
      </Box>
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
      {matchingVacancy?.data?.data &&
        matchingVacancy?.data?.data?.length > 0 && (
          <Box w="100%" mt={4}>
            <Text fontSize="xl" fontWeight="semibold" color="brand.mainBlue">
              Matching Vacancy for {teacherDetail.data?.user_profile.first_name}{' '}
              {teacherDetail.data?.user_profile.last_name}
            </Text>
            <Flex direction="row" flexWrap={'wrap'} mt={4} gap={4}>
              {matchingVacancy.data.data.map((data) => (
                <CardComponent
                  key={data.id}
                  address={data.organization.organization_detail.address}
                  img={data.organization.organization_detail.profile_pic}
                  classes={data.grade}
                  id={data.id}
                  subject={data.subject}
                  salary={data.salary_per_period}
                  job_from_time={data.job_from_time}
                  job_to_time={data.job_to_time}
                  jobType={data.job_type}
                  showApply
                  name={data.organization.organization_detail.name}
                  handleSendRequest={handleRequestApply}
                />
              ))}
            </Flex>
          </Box>
        )}

      <ModalComponent
        isOpen={isOpenApply}
        onClose={onCloseApply}
        heading={<Text>Apply Vacancy</Text>}
        primaryText="Apply Now"
        isLoading={sendOffer.isLoading}
        onApiCall={onApply}
        secondaryText="Cancel"
        footer={true}
        variant="danger"
      >
        <Text variant="modal" color="secondary.700">
          Are you sure you want to apply this teacher to this vacancy?
        </Text>
      </ModalComponent>
    </Wrapper>
  );
};

export default TeacherDetails;
