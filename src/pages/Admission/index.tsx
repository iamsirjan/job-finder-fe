import { Flex } from '@chakra-ui/react';
import Wrapper from '../../wrapper';
import { useGetVacancyList } from 'service/vacancy/service-vacancy';
import { useGetTeacherDetails } from 'service/service-teacher-register';

import AdmissionCard from 'components/AdmissionCard';

const Admission = () => {
  const vacancy = useGetVacancyList();
  const teacher = useGetTeacherDetails();

  const handleRequest = (id: string) => {
    //
  };

  return (
    <Wrapper>
      <Flex gap={2} flexWrap={'wrap'}>
        {vacancy.data?.data.data?.map((data) => (
          <AdmissionCard
            address={data.organization_full_detail.organization_detail.address}
            img={data.organization_full_detail.organization_detail.profile_pic}
            id={data.id}
            subject={data.organization_full_detail.organization_courses.map(
              (data) => data.name,
            )}
            classes={data.organization_full_detail.organization_courses.map(
              (data) => data.grade,
            )}
            name={data.organization_full_detail.organization_detail.name}
            handleSendRequest={handleRequest}
          />
        ))}
      </Flex>
    </Wrapper>
  );
};

export default Admission;
