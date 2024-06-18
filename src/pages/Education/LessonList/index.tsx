import { useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { FaFileVideo } from 'react-icons/fa6';
import Wrapper from 'wrapper';

// Example data structure for chapters of a course
const chapters = [
  {
    id: 1,
    name: 'tags',
    video: 'https://www.youtube.com/watch?v=ok-plXXHlWw&t=68s',
  },
  {
    id: 2,
    name: 'elements',
    video: 'https://www.youtube.com/watch?v=ravLFzIguCM',
  },
  {
    id: 3,
    name: 'img',
    video: 'https://www.youtube.com/watch?v=ok-plXXHlWw&t=68s',
  },
  // Add more chapters as needed
];

const LessonList = () => {
  const [selectedVideo, setSelectedVideo] = useState('');

  const extractEmbedUrl = (url: string) => {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get('v');
    const startTimeParam = urlObj.searchParams.get('t');
    let startTime = 0;

    if (startTimeParam) {
      const timeInSeconds = startTimeParam.replace('s', '');
      startTime = parseInt(timeInSeconds, 10);
    }

    return `https://www.youtube.com/embed/${videoId}?start=${startTime}`;
  };

  const handleLessonClick = (video: string) => {
    const embedUrl = extractEmbedUrl(video);
    setSelectedVideo(embedUrl);
  };

  return (
    <Wrapper>
      <Box borderWidth="1px" borderRadius="lg" p="4">
        <Text fontSize="xl" fontWeight="bold" mb="2">
          HTML
        </Text>
        <Flex gap={50} mt={4}>
          {chapters.map((chapter) => (
            <Flex
              cursor={'pointer'}
              key={chapter.id}
              mt="2"
              flexDirection={'column'}
              alignItems={'center'}
              onClick={() => handleLessonClick(chapter.video)}
            >
              <FaFileVideo fontSize={'50px'} />
              <Text mt={2} fontWeight={'600'}>
                {chapter.name}
              </Text>
            </Flex>
          ))}
        </Flex>
        {selectedVideo && (
          <Box mt="4">
            <iframe
              width="100%"
              height="400"
              src={selectedVideo}
              title="Video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Box>
        )}
      </Box>
    </Wrapper>
  );
};

export default LessonList;
