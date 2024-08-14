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
import { Layout } from 'components/layout/Layout';
import { PageHeader } from 'components/pageHeader';
import { useParams } from 'react-router-dom';
import { DefaultValues } from './firstStep/constant';
import { DefaultValues as SecondDefaultValues } from './secondStep/constant';
import { DefaultValues as ThirdDefaultValues } from './thirdStep/constant';
import { useGetTeacherDetailsByID } from 'service/service-teacher-register';

const TeacherEdit = () => {
  const { id } = useParams<{ id: string }>();

  const { data } = useGetTeacherDetailsByID({
    id: id ?? '',
  });
  const teacherFirstData = {
    ...data?.user_profile,
    ...data?.teacher,
  };

  const teacherSecondData = {
    degree: data?.teacher.degree,
    subject: data?.teacher.subject,
    grade: data?.teacher.grade,
    can_work_in_village: data?.teacher.can_work_in_village,
    can_work_in_city: data?.teacher.can_work_in_city,
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
                    <FirstStep data={teacherFirstData ?? DefaultValues} />
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
                      data={teacherSecondData ?? SecondDefaultValues}
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
                    <ThirdStep
                      data={data?.user_profile ?? ThirdDefaultValues}
                    />
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

export default TeacherEdit;
