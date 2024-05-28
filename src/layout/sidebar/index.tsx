import { Box, List, ListItem, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import NavItem from './NavItem';
import { navItems } from './navItemList';
import { webkit_scrollbar } from './style';
import { NAVIGATION_ROUTES } from '../../route/routes.constant';
import { useLogoutMutation } from 'service/service-auth';

const Sidebar = ({
  width,
  onEnterSidebar,
  onExitSidebar,
  isCollapsed,
  isHovered,
}: ISidebar) => {
  const logout = useLogoutMutation();

  const handleLogout = async () => {
    await logout.mutateAsync();
  };
  return (
    <Box
      // TODO: didn't know the reason behind this code
      //   position={'relative'}
      w={width}
      // TODO: i guess we need this, yet to figure out
      // maxW={width}
      bgColor={'white'}
      //TODO: can we add the color logic here in parent
      color={'gray.300'}
      transitionDuration={'0.6s'}
      onMouseEnter={onEnterSidebar}
      onMouseLeave={onExitSidebar}
      overflowY={'auto'}
      sx={{
        ...webkit_scrollbar,
        h: '100vh',
        '@supports (min-height: 100dvh)': {
          h: '100dvh',
        },
      }}
    >
      <List>
        <ListItem mx={3} my={6}>
          <Link as={RouterLink} to={NAVIGATION_ROUTES.BASE}>
            {/* PUT your project LOGO here */}
          </Link>
        </ListItem>
        {navItems.map((item) => (
          <NavItem
            key={item.name}
            {...item}
            isCollapsed={isCollapsed && !isHovered}
          />
        ))}
        <ListItem onClick={handleLogout} mx={3} my={6}>
          <Text>Logout</Text>
        </ListItem>
      </List>
    </Box>
  );
};

interface ISidebar {
  width: string;
  onEnterSidebar: () => void;
  onExitSidebar: () => void;
  isCollapsed: boolean;
  isHovered: boolean;
}
export default Sidebar;
