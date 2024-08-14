import { Box, Flex } from '@chakra-ui/react';

interface LabelBoxProps {
  items: string[];
  bgColor: string;
  limit?: number; // Optional limit with a default value
  color: string;
}

const LabelBox = ({ items, bgColor, color, limit = 3 }: LabelBoxProps) => {
  const displayedItems = items.slice(0, limit);
  const remainingCount = items.length - limit;

  return (
    <Flex flexWrap="wrap" alignItems="center" gap={1}>
      {displayedItems.map((item, index) => (
        <Flex
          key={index}
          bg={bgColor}
          borderRadius="8px"
          flexWrap={'wrap'}
          display="flex"
          alignItems={'center'}
          justifyContent={'center'}
          color={color}
          fontSize="13px"
          w="67px"
          height="27px"
          fontWeight="bold"
        >
          {item}
        </Flex>
      ))}
      {remainingCount > 0 && (
        <Box
          borderRadius="8px"
          px="8px"
          py="4px"
          display="inline-block"
          color="#000"
          fontSize="13px"
          fontWeight="bold"
          mr="4px"
          mb="4px"
        >
          {`+${remainingCount} more`}
        </Box>
      )}
    </Flex>
  );
};

export default LabelBox;
