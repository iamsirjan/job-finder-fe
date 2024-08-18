import React from 'react';
import {
  Flex,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  Box,
} from '@chakra-ui/react';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import { NAVIGATION_ROUTES } from '../../route/routes.constant';
import { SearchIcon } from '@chakra-ui/icons';
import { FaFilter, FaHome } from 'react-icons/fa';
import { BsFillPeopleFill } from 'react-icons/bs';
import { MdCastForEducation, MdSchool } from 'react-icons/md';
import { GrUserWorker } from 'react-icons/gr';
import { useAuthentication, useLogoutMutation } from 'service/service-auth';
import { useCommonStore } from 'state/common.state';

const MenuItem = ({
  to,
  icon: Icon,
  label,
  activeBGColor,
  activeColor,
}: {
  to: string;
  icon: React.ElementType;
  label: string;
  activeBGColor: (isActive: boolean) => string;
  activeColor: (isActive: boolean) => string;
}) => (
  <RouterNavLink style={{ width: '100%' }} to={to}>
    {({ isActive }) => (
      <Flex
        flex={1}
        p={'4px 8px'}
        background={isActive ? activeBGColor(isActive) : '#fff'}
        cursor={'pointer'}
        direction={'column'}
        gap={1}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Icon
          fontSize={'26px'}
          color={isActive ? activeColor(isActive) : '#000'}
        />
        <Text
          fontSize={'14px'}
          fontWeight={isActive ? '600' : '400'}
          color={isActive ? activeColor(isActive) : '#000'}
        >
          {label}
        </Text>
      </Flex>
    )}
  </RouterNavLink>
);

const Navbar = () => {
  const logout = useLogoutMutation();
  const { search } = useCommonStore();
  const { data: isAuthenticated } = useAuthentication();
  const activeColor = (isActive: boolean) => {
    if (isActive) {
      return '#5c51a2';
    } else {
      return '#000';
    }
  };

  const activeBGColor = (isActive: boolean) => {
    if (isActive) {
      return '#ecedf8';
    } else {
      return '#000';
    }
  };

  return (
    <Box>
      <Flex
        backgroundColor={'#b92e25'}
        padding={'10px 20px'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Flex>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon fontSize={'14px'} color="#fccbc8" />
            </InputLeftElement>
            <Input
              type="text"
              onChange={(e) =>
                useCommonStore.getState().setSearch(e.target.value)
              }
              placeholder="Search"
              value={search}
              border={'none'}
              outline={'none'}
              _placeholder={{ color: '#fccbc8', fontSize: '14px' }}
              color="#fccbc8"
              _focus={{ boxShadow: 'none', border: 'none' }}
            />
          </InputGroup>
        </Flex>
        <Flex gap={8} alignItems={'center'}>
          <Link to={NAVIGATION_ROUTES.DASHBOARD}>
            <Text fontSize={'14px'} color="#fccbc8">
              My Profile
            </Text>
          </Link>
          <Link to={NAVIGATION_ROUTES.MESSENGER}>
            <Text fontSize={'14px'} color="#fccbc8">
              Chat
            </Text>
          </Link>
          {isAuthenticated ? (
            <Text
              fontSize={'14px'}
              color="#fccbc8"
              cursor={'pointer'}
              onClick={() => logout.mutate()}
            >
              Logout
            </Text>
          ) : (
            <Link to={NAVIGATION_ROUTES.LOGIN}>
              <Text fontSize={'14px'} color="#fccbc8">
                login
              </Text>
            </Link>
          )}
          <FaFilter
            onClick={() => useCommonStore.getState().setDrawer(true)}
            cursor={'pointer'}
          />
        </Flex>
      </Flex>
      <Flex mt={'8px'}>
        <MenuItem
          to={NAVIGATION_ROUTES.BASE}
          icon={FaHome}
          label="Home"
          activeBGColor={activeBGColor}
          activeColor={activeColor}
        />
        <MenuItem
          to={NAVIGATION_ROUTES.STAFFS}
          icon={BsFillPeopleFill}
          label="Hire Staff"
          activeBGColor={activeBGColor}
          activeColor={activeColor}
        />
        <MenuItem
          to={NAVIGATION_ROUTES.EDUCATION}
          icon={MdCastForEducation}
          label="Free Education"
          activeBGColor={activeBGColor}
          activeColor={activeColor}
        />
        <MenuItem
          to={NAVIGATION_ROUTES.ADMISSION}
          icon={MdSchool}
          label="Admission"
          activeBGColor={activeBGColor}
          activeColor={activeColor}
        />
        <MenuItem
          to={NAVIGATION_ROUTES.DASHBOARD}
          icon={GrUserWorker}
          label="Agent"
          activeBGColor={activeBGColor}
          activeColor={activeColor}
        />
      </Flex>
    </Box>
  );
};

export default Navbar;
