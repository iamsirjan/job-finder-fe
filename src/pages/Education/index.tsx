import { Flex } from '@chakra-ui/react';
import Wrapper from '../../wrapper';
import { useGetVacancyList } from 'service/vacancy/service-vacancy';
import { useGetTeacherDetails } from 'service/service-teacher-register';

import EducationCard from 'components/EducationCard';

const Education = () => {
  const vacancy = useGetVacancyList();
  const teacher = useGetTeacherDetails();

  const handleRequest = (id: string) => {
    //
  };

  const data = [
    {
      id: '1',
      name: 'Frontend Development Course',
      key: ['react', 'redux', 'typescript', 'react-query'],
      hour: '52 hour course',
      chapters: ['html', 'css', 'javascript'],
      img: 'https://imgs.search.brave.com/NkYJjH1ndaZFN9fTByXUFz6SK5VtCFLFgvF_MvcId_I/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG40/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvbG9nb3MtMy82/MDAvUmVhY3QuanNf/bG9nby01MTIucG5n',
    },
  ];
  return (
    <Wrapper>
      <Flex gap={2} flexWrap={'wrap'}>
        {data?.map((data) => (
          <EducationCard
            address={data.hour}
            img={data.img}
            id={data.id}
            subject={data.chapters.map((data) => data)}
            classes={data.key.map((data) => data)}
            name={data.name}
            handleSendRequest={handleRequest}
          />
        ))}
      </Flex>
    </Wrapper>
  );
};

export default Education;
