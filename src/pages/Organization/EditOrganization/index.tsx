import {
  Box,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Card,
  CardBody,
} from '@chakra-ui/react';
import FirstStep from './firstStep';
import SecondStep from './secondStep';
import ThirdStep from './thirdStep';
import FourthStep from './fourthStep';
import { Layout } from 'components/layout/Layout';
import { PageHeader } from 'components/pageHeader';
import { useGetOrgDetailsByID } from 'service/service-organization-register';
import { useParams } from 'react-router-dom';
import { DefaultValues } from './firstStep/constant';
import { DefaultValues as SecondDefaultValues } from './secondStep/constant';
import { DefaultValues as ThirdDefaultValues } from './thirdStep/constant';

const EditOrganization = () => {
  const { id } = useParams<{ id: string }>();

  const orgDetails = useGetOrgDetailsByID(id ?? '');

  // {
  //   gradeSelect: [],
  //   courses: [
  //     {
  //       name: '',
  //       price: '',
  //       duration: '',
  //       grade: '',
  //     },
  //   ],
  // };

  const coursesData = {
    gradeSelect: orgDetails.data?.organization_courses.map(
      (data) => data.grade,
    ),
    courses: orgDetails.data?.organization_courses?.map((course) => ({
      name: course.name,
      duration: course.duration,
      price: course.price,
      grade: course.grade,
    })),
  };

  return (
    <Layout>
      <VStack
        h="100vh"
        spacing={4}
        bg="container.background"
        overflow="scroll"
        p={5}
      >
        <PageHeader title="Edit Organization" search={false} filter={false} />
        <Box w="100%" maxW="800px">
          <Accordion allowToggle defaultIndex={[0]}>
            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  First Step
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Card border="1px solid" borderColor="gray.200" boxShadow="sm">
                  <CardBody>
                    <FirstStep
                      data={
                        orgDetails?.data?.organization_detail ?? DefaultValues
                      }
                    />
                  </CardBody>
                </Card>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  Second Step
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Card border="1px solid" borderColor="gray.200" boxShadow="sm">
                  <CardBody>
                    <SecondStep
                      data={
                        orgDetails?.data?.organization_location ??
                        SecondDefaultValues
                      }
                    />
                  </CardBody>
                </Card>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  Third Step
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Card border="1px solid" borderColor="gray.200" boxShadow="sm">
                  <CardBody>
                    <ThirdStep data={coursesData ?? ThirdDefaultValues} />
                  </CardBody>
                </Card>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  Fourth Step
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Card border="1px solid" borderColor="gray.200" boxShadow="sm">
                  <CardBody>
                    <FourthStep />
                  </CardBody>
                </Card>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </VStack>
    </Layout>
  );
};

export default EditOrganization;
