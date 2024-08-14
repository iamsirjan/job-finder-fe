import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Select,
  SimpleGrid,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa6';
import { RxCross1 } from 'react-icons/rx';
import {
  EmailIcon,
  GradeIcon,
  JobType,
  LocationIcon,
  PhoneIcon,
  SalaryIcon,
  SubjectIcon,
  VacancyBanner,
} from 'assets';
import Wrapper from 'wrapper';
import LabelBox from 'components/labelBox';
import { VacancyStatus, useGetApplicantsByID } from 'service/service-offer-org';
import { useParams } from 'react-router-dom';
import DocumentCard from 'components/DocumentCard';
import ModalComponent from 'components/modal';
import { FormWrapper } from 'components/form/FormWrapper';
import {
  IStatusChange,
  StatusDefaultValue,
  StatusValidation,
} from 'pages/Organization/ChatSent/constant';
import StatusForm from 'pages/Organization/ChatSent/form';
import FormFooterButton from 'components/form/FormButton';
import {
  useAcceptVacancy,
  useRejectVacancy,
  useUpdateStatus,
} from 'service/service-change-status';
import { FaBirthdayCake } from 'react-icons/fa';
import {
  useGetVacancyList,
  useSendOffer,
} from 'service/vacancy/service-vacancy';
import { useGetAllTeacherDetails } from 'service/service-teacher-register';
import StaffCard from 'components/StaffCard';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormField from 'components/form/FormField';
import { jobTypeMap } from 'pages/Register/TeacherRegistration/firstStep/constant';

interface Document {
  id: number;
  file: string;
}

interface IFormInput {
  vacancy: string;
}

const ApplicantDetails = () => {
  const { id } = useParams<{ id: string }>();

  const staffs = useGetAllTeacherDetails();
  const applicants = useGetApplicantsByID({
    id: id ?? '',
  });
  console.log(applicants);
  const vacancyList = useGetVacancyList();

  const imageURL = import.meta.env.VITE_APP_IMAGE_API;

  const documents: { [key: string]: Document[] } = {
    citizenship: applicants.data?.teacher.citizenship ?? [
      {
        id: 0,
        file: '',
      },
    ],
    cv: applicants.data?.teacher.cv ?? [
      {
        id: 0,
        file: '',
      },
    ],
    document: applicants.data?.teacher.document ?? [
      {
        id: 0,
        file: '',
      },
    ],
  };

  const documentList = [
    ...documents.citizenship.map((doc) => ({
      name: 'Citizenship',
      file: doc.file,
    })),
    ...documents.cv.map((doc) => ({ name: 'CV', file: doc.file })),
    ...documents.document.map((doc) => ({ name: 'Document', file: doc.file })),
  ];

  const {
    isOpen: isOpenTeacher,
    onOpen: onOpenTeacher,
    onClose: onCloseTeacher,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const rejectApplication = useRejectVacancy();
  const acceptApplication = useAcceptVacancy();
  const updateStatus = useUpdateStatus();
  const [vacancy, setVacancy] = useState('');

  const handleSubmit = async (data: IStatusChange) => {
    await updateStatus.mutateAsync({
      id: vacancy,
      status: data.status,
    });
    if (data.status === VacancyStatus.REJECTED) {
      await rejectApplication.mutateAsync({
        message: data.message,
        id: vacancy,
      });
    } else if (data.status === VacancyStatus.APPROVED) {
      await acceptApplication.mutateAsync({
        id: vacancy,
        time: data.time,
        date: data.date,
      });
    }

    onCloseTeacher();
  };

  function calculateAge(dob: string): number {
    const birthDate = new Date(dob);
    if (isNaN(birthDate.getTime())) {
      throw new Error('Invalid date format');
    }

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    return age;
  }

  const [teacherId, setTeacherID] = useState('');
  const sendOffer = useSendOffer();

  // Initialize React Hook Form for offer submission
  const {
    register,
    handleSubmit: handleSubmitRequest,
    formState: { errors: errorsRequest, isSubmitting },
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
      <Flex direction="column" alignItems="center">
        <VacancyBanner />
        <Avatar size="xl" src={imageURL} mt={-12} mb={4} />
        {applicants.data?.vacancy.vacancy_application[0].status === '2' ? (
          <Badge variant="solid">Pending</Badge>
        ) : applicants.data?.vacancy.vacancy_application[0].status === '3' ? (
          <Badge variant="solid" colorScheme="red">
            REJECTED
          </Badge>
        ) : applicants.data?.vacancy.vacancy_application[0].status === '1' ? (
          <Badge variant="solid" colorScheme="purple">
            Scheduled FOR INTERVIEW
          </Badge>
        ) : (
          <Badge variant="solid" colorScheme="green">
            HIRED
          </Badge>
        )}

        <Box
          w="100%"
          p={4}
          mt={2}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Text fontSize="xl" fontWeight="semibold" color="brand.mainBlue">
              {applicants.data?.teacher.user_profile.first_name}{' '}
              {applicants.data?.teacher.user_profile.last_name}
            </Text>
            {/* <Button
              size="sm"
              borderRadius="full"
              colorScheme="blue"
              onClick={() => {
                setVacancy(id ?? '');
                onOpenTeacher();
              }}
            >
              Request Now
            </Button> */}
          </Flex>
          <Flex direction="column" gap={4}>
            <Flex alignItems="center" gap={2}>
              <PhoneIcon height="16px" />
              <Text fontSize="md" color="gray.500">
                {applicants.data?.teacher.user_profile.user_details.phone}
              </Text>
            </Flex>

            <Flex alignItems="center" gap={2}>
              <EmailIcon height="12px" />
              <Text fontSize="md" color="gray.500">
                {applicants.data?.teacher.user_profile.user_details.email}
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
        <Text mt={4}>{applicants.data?.teacher.teacher.biography}</Text>
      </Box>
      {applicants.data?.vacancy.vacancy_application[0].cover_letter && (
        <Box
          w="100%"
          p={4}
          mt={4}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          <Text fontSize={'20px'} fontWeight={'600'} color="brand.mainBlue">
            Cover Letter
          </Text>
          <Text mt={4}>
            {applicants.data?.vacancy.vacancy_application[0].cover_letter}
          </Text>
        </Box>
      )}
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
              {applicants.data?.teacher.user_profile.gender === '1'
                ? 'Male'
                : 'Female'}
            </Text>
          </Flex>

          <Flex gap={2} alignItems="center" flex={1}>
            <Text fontSize="16px">Age:</Text>
            <Text fontSize="16px">
              {calculateAge(
                applicants.data?.teacher.user_profile.date_of_birth ??
                  '2000-10-10',
              )}{' '}
              years
            </Text>
          </Flex>
        </Flex>
        <Flex marginTop={5}>
          <Flex gap={2} alignItems="center" flex={1}>
            <FaBirthdayCake />
            <Text fontSize="16px">DOB:</Text>
            <Text fontSize="16px">
              {applicants.data?.teacher.user_profile.date_of_birth}
            </Text>
          </Flex>

          <Flex gap={2} alignItems="center" flex={1}>
            <Text fontSize="16px">Experience:</Text>
            <Text fontSize="16px">
              {applicants.data?.teacher.teacher.experience_in_years} years
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
              {
                jobTypeMap[
                  applicants.data?.teacher.teacher.available_time ?? '1'
                ]
              }
            </Flex>
          </Flex>
        </Flex>
        <Flex marginTop={5} direction={'row'} gap={8} flexWrap={'wrap'}>
          <Flex gap={2} alignItems={'center'} flex={1}>
            <SubjectIcon />
            <LabelBox
              color={'#31883A'}
              items={
                applicants.data
                  ? applicants.data.teacher.teacher.subject.map(
                      (data) => data.name,
                    )
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
                applicants.data
                  ? applicants.data.teacher.teacher.grade.map(
                      (data) => data.name,
                    )
                  : ['']
              }
              bgColor={'#FFF0CA'}
            />
          </Flex>
        </Flex>
        <Flex marginTop={5} gap={8} flexWrap={'wrap'}>
          <Flex gap={2} alignItems={'center'} flex={1}>
            <LocationIcon height={'16px'} />
            <Text fontSize={'16px'}>balkot, bhaktapur</Text>
          </Flex>

          <Flex gap={2} alignItems={'center'} flex={2}>
            <SalaryIcon height="16px" />
            <Text fontSize={'16px'}>300 Per Period</Text>
          </Flex>
        </Flex>
        <Flex marginTop={5} direction={'row'} gap={8} flexWrap={'wrap'}>
          <Flex gap={2} alignItems={'center'} flex={1}>
            {applicants.data?.teacher.teacher.lodging ? (
              <FaCheck height={'16px'} color="green" />
            ) : (
              <RxCross1 height={'16px'} color="red" />
            )}

            <Text fontSize={'16px'}>Lodging</Text>
          </Flex>
          <Flex gap={2} alignItems={'center'} flex={1}>
            {applicants.data?.teacher.teacher.fooding ? (
              <FaCheck height={'16px'} color="green" />
            ) : (
              <RxCross1 height={'16px'} color="red" />
            )}
            <Text fontSize={'16px'}>Fooding</Text>
          </Flex>

          <Flex gap={2} alignItems={'center'} flex={1}>
            {applicants.data?.teacher.teacher.is_available_for_tuition ? (
              <FaCheck height={'16px'} color="green" />
            ) : (
              <RxCross1 height={'16px'} color="red" />
            )}
            <Text fontSize={'16px'}>Available For Tution</Text>
          </Flex>
        </Flex>

        <Flex marginTop={5} direction={'row'} gap={8} flexWrap={'wrap'}>
          <Flex gap={2} alignItems={'center'} flex={1}>
            {applicants.data?.teacher.teacher.can_work_in_village ? (
              <FaCheck height={'16px'} color="green" />
            ) : (
              <RxCross1 height={'16px'} color="red" />
            )}
            <Text fontSize={'16px'}>Village</Text>
          </Flex>
          <Flex gap={2} alignItems={'center'} flex={1}>
            {applicants.data?.teacher.teacher.can_work_in_city ? (
              <FaCheck height={'16px'} color="green" />
            ) : (
              <RxCross1 height={'16px'} color="red" />
            )}
            <Text fontSize={'16px'}>City</Text>
          </Flex>

          <Flex gap={2} alignItems={'center'} flex={1}>
            {applicants.data?.teacher.teacher.can_work_in_city &&
            applicants.data?.teacher.teacher.can_work_in_village ? (
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
        <Text fontSize={'20px'} fontWeight={'600'} color="brand.mainBlue">
          Attached Documents
        </Text>
        <Box mt={4}>
          <SimpleGrid columns={[1, null, 2]} spacing="40px" p={10}>
            {documentList.map((doc, index) => (
              <DocumentCard
                key={index}
                name={doc.name}
                file={imageURL + doc.file}
              />
            ))}
          </SimpleGrid>
        </Box>
      </Box>
      <ModalComponent
        heading={<Text>change status</Text>}
        isOpen={isOpenTeacher}
        onClose={onCloseTeacher}
      >
        <FormWrapper<IStatusChange>
          defaultValues={StatusDefaultValue}
          validationSchema={StatusValidation}
          onSubmit={handleSubmit}
        >
          <StatusForm />
          <FormFooterButton
            isCreateFlow={true}
            handleCancelClick={onCloseTeacher}
            isFormSubmitting={
              updateStatus.isLoading ||
              rejectApplication.isLoading ||
              acceptApplication.isLoading
            }
          />
        </FormWrapper>
      </ModalComponent>

      <ModalComponent
        heading={<Text>Request Staffs</Text>}
        onClose={onClose}
        isOpen={isOpen}
      >
        <form onSubmit={handleSubmitRequest(onSubmit)}>
          <FormField label="Vacancy List">
            <Select {...register('vacancy')} placeholder="Select option">
              {vacancyList?.data?.map((data) => (
                <option key={data.id} value={data.id}>
                  {data.name}
                </option>
              ))}
            </Select>
            {errorsRequest.vacancy && (
              <Text color="red.500">{errorsRequest.vacancy.message}</Text>
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
      {/* <Box w="100%" mt={6}>
        <Text fontSize="xl" fontWeight="semibold" color="brand.mainBlue">
          Teacher with similar Profile
        </Text>
        <Flex direction="row" flexWrap={'wrap'} mt={4} gap={4}>
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
      </Box> */}
    </Wrapper>
  );
};

export default ApplicantDetails;
