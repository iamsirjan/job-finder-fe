import { Box, Flex, Text } from '@chakra-ui/react';
import Wrapper from 'wrapper';
import { FaFolder } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const CourseList = () => {
  // Example data structure for chapters of a course
  const chapters = [
    { id: 1, name: 'HTML' },
    { id: 2, name: 'CSS' },
    { id: 3, name: 'JavaScript' },
    // Add more chapters as needed
  ];

  return (
    <Wrapper>
      <Box borderWidth="1px" borderRadius="lg" p="4">
        <Text fontSize="xl" fontWeight="bold" mb="2">
          Frontend Development Course
        </Text>
        <Flex gap={50}>
          {chapters.map((chapter) => (
            <Flex
              cursor={'pointer'}
              key={chapter.id}
              mt="2"
              flexDirection={'column'}
              justifyContent={'space-between'}
            >
              <FaFolder fontSize={'50px'} />
              <Link to={`/education/courses/1/lessons/1`}>
                <Text fontWeight={'600'}>{chapter.name}</Text>
              </Link>
            </Flex>
          ))}
        </Flex>
      </Box>
    </Wrapper>
  );
};

export default CourseList;
