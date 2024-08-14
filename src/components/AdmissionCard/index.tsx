import { Box, Button, Flex, Text, Divider, Avatar } from '@chakra-ui/react';
import { GradeIcon, LocationIcon, SubjectIcon } from 'assets';
import LabelBox from 'components/labelBox';
import { FaStar } from 'react-icons/fa';
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

const AdmissionCard = ({
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
    >
      <Flex direction="column" gap={4}>
        {/* Top Section */}
        <Flex gap={4} alignItems="flex-start">
          <Avatar
            size="lg"
            name={name}
            src={imageURL + img}
            borderRadius="10%"
          />
          <Flex flexDirection={'column'}>
            <Text
              fontWeight="700"
              fontSize="18px"
              display={'flex'}
              color={'brand.mainBlue'}
              alignItems={'center'}
            >
              {name}{' '}
            </Text>
            <Flex
              gap={1}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Text display={'flex'} gap={2} fontSize="14px" color="gray.500">
                <LocationIcon /> {address}
              </Text>
              <Flex align="center" gap="2px">
                {[...Array(5)].map((_, i) => (
                  <FaStar color="#FFD700" key={i} fontSize={'14px'} />
                ))}
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        {/* Divider */}
        <Divider />

        {/* Bottom Section */}
        <Flex gap={4} alignItems={'center'}>
          <SubjectIcon />
          <LabelBox color={'#31883A'} items={subject} bgColor={'#DEFFCA'} />
        </Flex>
        <Flex gap={4} alignItems={'center'}>
          <GradeIcon />
          <LabelBox color={'#EFB92D'} items={classes} bgColor={'#FFF0CA'} />
        </Flex>
        {/* Action Buttons */}
        <Flex mt={2} gap={4}>
          {user.data?.is_student && (
            <Button
              size="md"
              borderRadius={'25px'}
              w={'140px'}
              background={'brand.mainBlue'}
              onClick={() => handleSendRequest(id)}
            >
              Send Request
            </Button>
          )}
          <Button
            size="md"
            borderRadius={'25px'}
            w={'140px'}
            background={'brand.mainBlue'}
          >
            View Details
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default AdmissionCard;
