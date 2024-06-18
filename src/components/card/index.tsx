import {
  Box,
  Button,
  Flex,
  Text,
  VStack,
  HStack,
  Divider,
  Avatar,
} from '@chakra-ui/react';
import LabelBox from 'components/labelBox';
import { FaStar, FaCheckCircle } from 'react-icons/fa';
import { useGetUserDetails } from 'service/service-user';

interface ICard {
  id: string;
  img: string;
  name: string;
  address: string;
  subject: string[];
  classes: string[];
  handleSendRequest: (id: string) => void;
}

const CardComponent = ({
  img,
  name,
  address,
  subject,
  classes,
  handleSendRequest,
  id,
}: ICard) => {
  const imageURL = import.meta.env.VITE_APP_IMAGE_API;
  const user = useGetUserDetails();
  return (
    <Box
      p="20px"
      background="#fff"
      border="1px solid #e2e8f0"
      borderRadius="8px"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
      maxW="650px"
    >
      <Flex direction="column" gap={4}>
        {/* Top Section */}
        <HStack spacing={4} alignItems="flex-start">
          <Avatar
            size="lg"
            name={name}
            src={imageURL + img}
            borderRadius="full"
          />
          <Flex direction="column" flex="1" gap={1}>
            <Text
              fontWeight="700"
              fontSize="18px"
              color="#09305A"
              display={'flex'}
              alignItems={'center'}
            >
              {name}{' '}
              <FaCheckCircle color="green" style={{ marginLeft: '8px' }} />
            </Text>
            <Text fontSize="14px" color="gray.500">
              {address}
            </Text>
            <Flex mt={2} align="center">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  color="#FFD700"
                  key={i}
                  style={{ marginRight: '2px' }}
                />
              ))}
            </Flex>

            {/* Action Buttons */}
          </Flex>
          <VStack>
            {user.data?.is_teacher && (
              <Button
                variant="outline"
                size="sm"
                w="140px"
                colorScheme="teal"
                onClick={() => handleSendRequest(id)}
              >
                Send Request
              </Button>
            )}
            <Button variant="outline" size="sm" w="140px" colorScheme="teal">
              View Details
            </Button>
          </VStack>
        </HStack>

        {/* Divider */}
        <Divider />

        {/* Bottom Section */}
        <Box>
          <Text fontWeight="600" fontSize="15px" color="#09305A" mb={2}>
            Subjects:
          </Text>
          <LabelBox items={subject} bgColor={'#FF6B6B'} />
        </Box>
        <Box>
          <Text fontWeight="600" fontSize="15px" color="#09305A" mb={2}>
            Classes:
          </Text>
          <Text fontSize="14px" color="gray.600">
            <LabelBox items={classes} bgColor={'#4CAF50'} />
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default CardComponent;
