import React from 'react';
import { Box, Text, Link } from '@chakra-ui/react';

interface DocumentCardProps {
  name: string;
  file: string;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ name, file }) => {
  return (
    <Link href={file} isExternal style={{ textDecoration: 'inherit' }}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        height={'300px'}
        textAlign="center"
        boxShadow="md"
        _hover={{ transform: 'scale(1.01)', transition: 'transform 0.6s' }}
      >
        <Box
          bg="blue.500"
          p={4}
          borderRadius="md"
          color="white"
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          height={'200px'}
        >
          <Text fontWeight="bold" fontSize="xl">
            {name}
          </Text>
        </Box>
        <Text mt={2} color="gray.500">
          {file.split('/').pop()}
        </Text>
      </Box>
    </Link>
  );
};

export default DocumentCard;
