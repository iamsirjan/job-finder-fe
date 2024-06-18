import React from 'react';
import {
  Box,
  Flex,
  HStack,
  Button,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { NAVIGATION_ROUTES } from '../../route/routes.constant';
import { useAuthentication, useLogoutMutation } from 'service/service-auth';

const Links = [
  {
    label: 'Staffs',
    link: NAVIGATION_ROUTES.STAFFS,
  },
  {
    label: 'Admission',
    link: NAVIGATION_ROUTES.ADMISSION,
  },
  {
    label: 'Education',
    link: NAVIGATION_ROUTES.EDUCATION,
  },
];

const NavLink = ({ route, children }: INavbar) => {
  const location = useLocation();

  // Determine if the current link is active
  const isActive = route === location.pathname;

  return (
    <RouterNavLink
      to={route}
      className="nav-link"
      style={{
        fontWeight: '800',
        borderBottom: isActive ? '2px solid red' : 'none',
      }}
    >
      {children}
    </RouterNavLink>
  );
};

const Navbar = () => {
  const { data: isAuthenticated } = useAuthentication();
  const logout = useLogoutMutation();

  const handleLogout = async () => {
    await logout.mutateAsync();
  };

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Flex>
          <RouterNavLink to={NAVIGATION_ROUTES.BASE}>
            <Text color="main.100" fontWeight={'800'}>
              Job Finder
            </Text>
          </RouterNavLink>
        </Flex>
        <HStack spacing={8} alignItems="center">
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
            {Links.map((link, i) => (
              <NavLink route={link.link} key={i}>
                {link.label}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems="center">
          {!isAuthenticated ? (
            <HStack>
              <RouterNavLink to={NAVIGATION_ROUTES.LOGIN}>
                <Button
                  variant="outline"
                  colorScheme="main.100"
                  size="sm"
                  mr={4}
                >
                  Login
                </Button>
              </RouterNavLink>
              <RouterNavLink to={NAVIGATION_ROUTES.REGISTER}>
                <Button
                  variant="outline"
                  colorScheme="main.100"
                  size="sm"
                  mr={4}
                >
                  Register
                </Button>
              </RouterNavLink>
            </HStack>
          ) : (
            <>
              <Button
                variant="outline"
                colorScheme="main.100"
                size="sm"
                onClick={handleLogout}
                mr={4}
              >
                Logout
              </Button>
              <RouterNavLink to={NAVIGATION_ROUTES.DASHBOARD}>
                <Button
                  variant="outline"
                  colorScheme="main.100"
                  size="sm"
                  mr={4}
                >
                  Dashboard
                </Button>
              </RouterNavLink>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;

interface INavbar {
  children: React.ReactNode;
  route: string;
}
