import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

import { EmailIcon, PhoneIcon, VacancyBanner, WebsiteIcon } from 'assets';
import Wrapper from 'wrapper';
import { useGetMatchingOrgById } from 'service/vacancy/service-vacancy';
import CardComponent from 'components/card';
import { useParams } from 'react-router-dom';
import { useGetOrgDetailsByID } from 'service/service-organization-register';

const OrganizationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const orgDetails = useGetOrgDetailsByID(id ?? '');
  const imageURL = import.meta.env.VITE_APP_IMAGE_API;
  const matchingDetails = useGetMatchingOrgById({ id: id ?? '' });

  return (
    <Wrapper>
      <Flex direction="column" alignItems="center">
        <VacancyBanner />
        <Avatar
          size="xl"
          src={imageURL + orgDetails.data?.organization_detail.profile_pic}
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
              {orgDetails.data?.organization_detail.name}
            </Text>
          </Flex>
          <Flex direction="column" gap={4}>
            <Flex alignItems="center" gap={2}>
              <PhoneIcon height="16px" />
              <Text fontSize="md" color="gray.500">
                {orgDetails.data?.organization_detail.phone_number}
              </Text>
            </Flex>
            <Flex alignItems="center" gap={2}>
              <WebsiteIcon height="16px" />
              <Text fontSize="md" color="gray.500">
                {orgDetails.data?.organization_detail.web_site_link}
              </Text>
            </Flex>
            <Flex alignItems="center" gap={2}>
              <EmailIcon height="12px" />
              <Text fontSize="md" color="gray.500">
                {orgDetails.data?.organization_detail.address}
              </Text>
            </Flex>
          </Flex>
        </Box>

        {matchingDetails.data &&
          matchingDetails?.data?.other_vacancy?.length > 0 && (
            <Box w="100%" mt={4}>
              <Text fontSize="xl" fontWeight="semibold" color="brand.mainBlue">
                More Vacancies from {orgDetails.data?.organization_detail.name}
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
                    handleSendRequest={() => {}}
                  />
                ))}
              </Flex>
            </Box>
          )}
      </Flex>
    </Wrapper>
  );
};

export default OrganizationDetails;
