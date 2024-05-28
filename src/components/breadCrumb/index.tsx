import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  BreadcrumbItem,
  Breadcrumb,
  BreadcrumbLink,
  Text,
  Flex,
  Box,
  Icon,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
interface IBreadCrumb {
  items: { name: string; route: string }[];
  goBack?: string;
  title: { name: string; route: string };
}

export const BreadCrumb = ({ items, title }: IBreadCrumb) => {
  const navigate = useNavigate();

  return (
    <Box pb={6} my={6}>
      <Flex justifyContent="space-between" alignItems="center" height={4}>
        <Breadcrumb spacing={1} separator={''}>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Flex alignItems={'center'}>
                <Text
                  fontWeight={'300'}
                  color={'primary.500'}
                  fontSize={{ base: 'sm', md: 'sm' }}
                  _hover={{}}
                  onClick={() => navigate(title.route)}
                >
                  {title.name}
                </Text>
              </Flex>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {items.length != 0 && (
            <Icon as={ChevronRightIcon} color={'gray.200'} fontSize="xl" />
          )}
          {items.map((item, i) => (
            <BreadcrumbItem key={i}>
              <BreadcrumbLink onClick={() => navigate(item.route)}>
                <Text fontWeight={'100'} color={'gray.500'}>
                  {item.name}
                </Text>
              </BreadcrumbLink>
              {items.length - 1 !== i && (
                <Icon as={ChevronRightIcon} color={'gray.200'} fontSize="xl" />
              )}
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      </Flex>
    </Box>
  );
};
