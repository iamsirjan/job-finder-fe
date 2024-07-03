import { Flex } from '@chakra-ui/react';
import Wrapper from '../../wrapper';
import { useGetVacancyList } from 'service/vacancy/service-vacancy';
// import { useGetTeacherDetails } from 'service/service-teacher-register';

import AdmissionCard from 'components/AdmissionCard';

const Admission = () => {
  const vacancy = useGetVacancyList();
  // const teacher = useGetTeacherDetails();

  const handleRequest = (id: string) => {
    console.log(id);
  };

  return (
    <Wrapper>
      <Flex gap={2} flexWrap={'wrap'}>
        {vacancy.data?.map((data) => (
          <AdmissionCard
            address={data.organization.organization_detail.address}
            img={data.organization.organization_detail.profile_pic}
            id={data.id}
            subject={data.organization.organization_courses.map(
              (data) => data.name,
            )}
            classes={data.organization.organization_courses.map(
              (data) => data.grade,
            )}
            name={data.organization.organization_detail.name}
            handleSendRequest={handleRequest}
          />
        ))}
      </Flex>
    </Wrapper>
  );
};

export default Admission;
