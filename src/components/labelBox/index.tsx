import { Box, Flex } from '@chakra-ui/react';

interface LabelBoxProps {
  items: string[];
  bgColor: string;
  limit?: number; // Optional limit with a default value
}

const LabelBox = ({ items, bgColor, limit = 3 }: LabelBoxProps) => {
  const displayedItems = items.slice(0, limit);
  const remainingCount = items.length - limit;

  return (
    <Flex flexWrap="wrap" alignItems="center">
      {displayedItems.map((item, index) => (
        <Box
          key={index}
          bg={bgColor}
          borderRadius="5px"
          px="8px"
          py="4px"
          display="inline-block"
          color="white"
          fontSize="13px"
          fontWeight="bold"
          mr="4px"
          mb="4px"
        >
          {item}
        </Box>
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
