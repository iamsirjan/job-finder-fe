import {
  Box,
  Flex,
  HStack,
  Link,
  Button,
  useColorModeValue,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { NAVIGATION_ROUTES } from '../../route/routes.constant';
import { useAuthentication } from 'service/service-auth';

const Links = ['Staffs', 'Admission', 'Education'];

const NavLink = ({ children }: INavbar) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    color="main.100"
    fontWeight={600}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const { data: isAuthenticated } = useAuthentication();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Flex>
            <Text color="main.100">Job Finder</Text>
          </Flex>
          <HStack spacing={8} alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            {!isAuthenticated ? (
              <HStack>
                <RouterLink to={NAVIGATION_ROUTES.LOGIN}>
                  <Button
                    variant={'outline'}
                    colorScheme={'main.100'}
                    size={'sm'}
                    mr={4}
                  >
                    Login
                  </Button>
                </RouterLink>
                <RouterLink to={NAVIGATION_ROUTES.REGISTER}>
                  <Button
                    variant={'outline'}
                    colorScheme={'main.100'}
                    size={'sm'}
                    mr={4}
                  >
                    Register
                  </Button>
                </RouterLink>
              </HStack>
            ) : (
              <RouterLink to={NAVIGATION_ROUTES.DASHBOARD}>
                <Button
                  variant={'outline'}
                  colorScheme={'main.100'}
                  size={'sm'}
                  mr={4}
                >
                  Dashboard
                </Button>
              </RouterLink>
            )}
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;

interface INavbar {
  children: React.ReactNode;
}
