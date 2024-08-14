import {
  Avatar,
  Box,
  Button,
  Flex,
  ListItem,
  Text,
  Textarea,
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa';
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
  useGetMatchingOrgById,
  useGetVacancyListById,
  useSendOffer,
} from 'service/vacancy/service-vacancy';
import LabelBox from 'components/labelBox';
import { useParams } from 'react-router-dom';
import { useGetUserDetails } from 'service/service-user';
import { jobTypeMap } from 'pages/Register/TeacherRegistration/firstStep/constant';
import StaffCard from 'components/StaffCard';
import ModalComponent from 'components/modal';
import FormField from 'components/form/FormField';
import FormFooterButton from 'components/form/FormButton';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useGetTeacherDetails } from 'service/service-teacher-register';

interface IFormInputTeacher {
  coverLetter: string;
}

const VacancyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const imageURL = import.meta.env.VITE_APP_IMAGE_API;
  const [vacancyId, setVacancyID] = useState('');
  const applyVacancy = useApplyVacancy();
  const teacher = useGetTeacherDetails();
  const user = useGetUserDetails();
  const vacancyDetails = useGetVacancyListById({ id: id ?? '' });
  const matchingDetails = useGetMatchingOrgById({ id: id ?? '' });
  const sendOffer = useSendOffer();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenTeacher,
    onOpen: onOpenTeacher,
    onClose: onCloseTeacher,
  } = useDisclosure();
  const [teacherId, setTeacherID] = useState('');

  const onSubmit = async () => {
    await sendOffer.mutateAsync({
      teacher: teacherId,
      vacancy: id ?? '',
      is_offered: true,
    });

    onClose();
  };

  // Initialize React Hook Form for applying to vacancy
  const {
    register: registerTeacher,
    handleSubmit: handleSubmitTeacher,
    formState: { errors: errorsTeacher, isSubmitting: isSubmittingTeacher },
    reset: resetTeacher,
  } = useForm<IFormInputTeacher>();

  const onSubmitTeacher: SubmitHandler<IFormInputTeacher> = async (data) => {
    await applyVacancy.mutateAsync({
      cover_letter: data.coverLetter,
      cv: teacher.data?.data.data.cv[0].id.toString() ?? '',
      teacher: teacher.data?.data.data.user_profile.id.toString() ?? '',
      vacancy: vacancyId,
    });

    resetTeacher();
    onCloseTeacher();
  };

  const handleRequest = (id: string) => {
    setTeacherID(id);
    onOpen();
  };

  const handleRequestTeacher = (id: string) => {
    setVacancyID(id);
    onOpenTeacher();
  };

  return (
    <Wrapper>
      <Flex direction="column" alignItems="center">
        <VacancyBanner />
        <Avatar
          size="xl"
          src={
            imageURL +
            vacancyDetails.data?.organization.organization_detail.profile_pic
          }
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
              {vacancyDetails.data?.organization.organization_detail.name}
            </Text>
            {user.data?.is_teacher && (
              <Button
                size="sm"
                borderRadius="full"
                colorScheme="blue"
                onClick={() => handleRequestTeacher(id ?? '')}
              >
                Apply Now
              </Button>
            )}
          </Flex>
          <Flex direction="column" gap={4}>
            <Flex alignItems="center" gap={2}>
              <PhoneIcon height="16px" />
              <Text fontSize="md" color="gray.500">
                {
                  vacancyDetails.data?.organization.organization_detail
                    .phone_number
                }
              </Text>
            </Flex>
            <Flex alignItems="center" gap={2}>
              <WebsiteIcon height="16px" />
              <Text fontSize="md" color="gray.500">
                {
                  vacancyDetails.data?.organization.organization_detail
                    .web_site_link
                }
              </Text>
            </Flex>
            <Flex alignItems="center" gap={2}>
              <EmailIcon height="12px" />
              <Text fontSize="md" color="gray.500">
                {vacancyDetails.data?.organization.organization_detail.address}
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
            Vacancy Details
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
                {jobTypeMap[vacancyDetails.data?.job_type ?? '1']}
              </Flex>
            </Flex>
          </Flex>
          <Flex marginTop={5} direction={'row'} gap={8} flexWrap={'wrap'}>
            <Flex gap={2} alignItems={'center'} flex={1}>
              <SubjectIcon />
              <LabelBox
                color={'#31883A'}
                items={
                  vacancyDetails.data?.subject
                    ? vacancyDetails.data?.subject.map((data) => data)
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
                  vacancyDetails.data?.grade
                    ? vacancyDetails.data?.grade.map((data) => data)
                    : ['']
                }
                bgColor={'#FFF0CA'}
              />
            </Flex>
          </Flex>
          <Flex marginTop={5} gap={8} flexWrap={'wrap'}>
            <Flex gap={2} alignItems={'center'} flex={1}>
              <TimeIcon height={'16px'} />
              {jobTypeMap[vacancyDetails.data?.job_type ?? '1'] ?? '1' ? (
                <Text fontSize={'16px'}>10AM - 5PM</Text>
              ) : (
                <Text fontSize={'16px'}>
                  {vacancyDetails.data?.job_from_time +
                    ' ' +
                    '-' +
                    ' ' +
                    vacancyDetails.data?.job_to_time}
                </Text>
              )}
            </Flex>
            <Flex gap={2} alignItems={'center'} flex={1}>
              <LocationIcon height={'16px'} />
              <Text fontSize={'16px'}>
                {vacancyDetails.data?.organization.organization_detail.address}
              </Text>
            </Flex>

            <Flex gap={2} alignItems={'center'} flex={1}>
              <SalaryIcon height="16px" />
              <Text fontSize={'16px'}>
                {vacancyDetails.data?.salary_per_period} Per Period
              </Text>
            </Flex>
          </Flex>
          <Flex marginTop={5} direction={'row'} gap={8} flexWrap={'wrap'}>
            <Flex gap={2} alignItems={'center'} flex={1}>
              {vacancyDetails.data?.lodging ? (
                <FaCheck height={'16px'} color="green" />
              ) : (
                <RxCross1 height={'16px'} color="red" />
              )}

              <Text fontSize={'16px'}>Lodging</Text>
            </Flex>
            <Flex gap={2} alignItems={'center'} flex={1}>
              {vacancyDetails.data?.fooding ? (
                <FaCheck height={'16px'} color="green" />
              ) : (
                <RxCross1 height={'16px'} color="red" />
              )}
              <Text fontSize={'16px'}>Fooding</Text>
            </Flex>

            <Flex gap={2} alignItems={'center'} flex={1}>
              {vacancyDetails.data?.allow_fresher ? (
                <FaCheck height={'16px'} color="green" />
              ) : (
                <RxCross1 height={'16px'} color="red" />
              )}
              <Text fontSize={'16px'}>Freshers</Text>
            </Flex>
          </Flex>

          <Flex marginTop={5} direction={'row'} gap={8} flexWrap={'wrap'}>
            <Flex gap={2} alignItems={'center'} flex={1}>
              {vacancyDetails.data?.allow_fresher ? (
                <FaCheck height={'16px'} color="green" />
              ) : (
                <RxCross1 height={'16px'} color="red" />
              )}
              <Text fontSize={'16px'}>Village</Text>
            </Flex>
            <Flex gap={2} alignItems={'center'} flex={1}>
              {vacancyDetails.data?.allow_fresher ? (
                <FaCheck height={'16px'} color="green" />
              ) : (
                <RxCross1 height={'16px'} color="red" />
              )}
              <Text fontSize={'16px'}>City</Text>
            </Flex>

            <Flex gap={2} alignItems={'center'} flex={1}>
              {vacancyDetails.data?.allow_fresher ? (
                <FaCheck height={'16px'} color="green" />
              ) : (
                <RxCross1 height={'16px'} color="red" />
              )}
              <Text fontSize={'16px'}>Village and City</Text>
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
          <Text fontSize="xl" fontWeight="semibold" color="brand.mainBlue">
            Qualifications
          </Text>
          <UnorderedList mt={4} fontSize="md">
            <ListItem fontWeight="300">
              Minimum of a {vacancyDetails.data?.qualification.name} education
              qualification.
            </ListItem>
            {!vacancyDetails.data?.allow_fresher && (
              <ListItem fontWeight="300">
                At least {vacancyDetails.data?.experience_in_years} years of
                teaching experience, preferably with{' '}
                {vacancyDetails.data?.grade.map((data) => data)} students.
              </ListItem>
            )}
            <ListItem fontWeight="300">
              Strong knowledge of{' '}
              {vacancyDetails.data?.subject.map((data) => data)} subject matter.
            </ListItem>
            <ListItem fontWeight="300">
              Excellent communication and interpersonal skills.
            </ListItem>
            <ListItem fontWeight="300">
              Ability to create a positive and inclusive classroom environment.
            </ListItem>
            <ListItem fontWeight="300">
              Proficiency in using educational technology and online teaching
              tools.
            </ListItem>
            <ListItem fontWeight="300">
              Commitment to continuous professional development and lifelong
              learning.
            </ListItem>
          </UnorderedList>
        </Box>

        {/* {matchingDetails.data &&
          matchingDetails?.data?.other_vacancy?.length > 0 && (
            <Box w="100%" mt={4}>
              <Text fontSize="xl" fontWeight="semibold" color="brand.mainBlue">
                More Vacancies from{' '}
                {vacancyDetails.data?.organization.organization_detail.name}
              </Text>
              <Flex direction="row" flexWrap={'wrap'} mt={4} gap={4}>
                {matchingDetails?.data?.other_vacancy.map((data) => (
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
                    name={data.organization.organization_detail.name}
                    handleSendRequest={handleRequestTeacher}
                  />
                ))}
              </Flex>
            </Box>
          )} */}

        {matchingDetails.data &&
          matchingDetails?.data?.matching_teacher?.length > 0 && (
            <Box w="100%" mt={4}>
              <Text fontSize="xl" fontWeight="semibold" color="brand.mainBlue">
                Matching Teachers for{' '}
                {vacancyDetails.data?.organization.organization_detail.name}
              </Text>
              <Flex direction="row" flexWrap={'wrap'} mt={4} gap={4}>
                {matchingDetails?.data?.matching_teacher.map((data) => (
                  <StaffCard
                    key={data.user_profile.id}
                    address={data.user_profile.user_details.address}
                    showApply
                    img={data.user_profile.profile_picture}
                    salary={data.teacher.salary_per_period}
                    job_from_time={data.teacher.period_from_time}
                    job_to_time={data.teacher.period_to_time}
                    jobType={data.teacher.available_time}
                    id={data.user_profile.id}
                    subject={data.teacher.subject.map((data) => data.name)}
                    classes={data.teacher.grade.map((data) => data.name)}
                    name={`${data.user_profile.first_name} ${data.user_profile.last_name}`}
                    handleSendRequest={handleRequest}
                  />
                ))}
              </Flex>
            </Box>
          )}

        <ModalComponent
          isOpen={isOpen}
          onClose={onClose}
          heading={<Text>Send Offer</Text>}
          primaryText="Send Offer"
          isLoading={sendOffer.isLoading}
          onApiCall={onSubmit}
          secondaryText="Cancel"
          footer={true}
          variant="danger"
        >
          <Text variant="modal" color="secondary.700">
            Are you sure you want to send offer to this teacher?
          </Text>
        </ModalComponent>

        <ModalComponent
          heading={<Text>Send Cover Letter</Text>}
          onClose={onCloseTeacher}
          isOpen={isOpenTeacher}
        >
          <form onSubmit={handleSubmitTeacher(onSubmitTeacher)}>
            <FormField label="Cover letter">
              <Textarea
                rows={6}
                placeholder="Enter your cover letter"
                {...registerTeacher('coverLetter', {
                  required: 'Cover letter is required',
                })}
              />
              {errorsTeacher.coverLetter && (
                <Text color="red.500">{errorsTeacher.coverLetter.message}</Text>
              )}
            </FormField>
            <Flex justifyContent="flex-end" mt={4}>
              <FormFooterButton
                isCreateFlow={true}
                handleCancelClick={onCloseTeacher}
                isFormSubmitting={isSubmittingTeacher}
              />
            </Flex>
          </form>
        </ModalComponent>
      </Flex>
    </Wrapper>
  );
};

export default VacancyDetails;
