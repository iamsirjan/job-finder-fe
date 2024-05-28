import { Link as RouterLink } from "react-router-dom";
import { ListItem, Link, Text, Icon } from "@chakra-ui/react";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { RightArrowIcon } from "../../assets";

const Item = ({
  name,
  to,
  ComponentIcon,
  isCollapsed,
  showDropdown,
  setShowDropdown,
  activeParent,
  active,
  isChild,
  children,
}: {
  name: string;
  to: string;
  ComponentIcon: React.FC<React.SVGProps<SVGSVGElement>>;
  isCollapsed?: boolean;

  showDropdown?: boolean;
  setShowDropdown?: Dispatch<SetStateAction<boolean | undefined>>;

  activeParent?: boolean;
  active: boolean;
  isChild?: boolean;
  children?: ReactNode;
}) => {
  if (location.pathname === to) active = true;

  // The navItem should be active when,
  // 1. active: the path in the url matches the url of the navItem
  // 2. showDropdown: it is the child which is clicked when the parent navItem is in onOpen state
  // 3. activeParent: it is the parent of the navItem with active children
  const activeTab = active || showDropdown || activeParent;

  return (
    <>
      <Link
        as={RouterLink}
        to={to}
        color={"white"}
        // there is a default textDecoration, to remove it ⬇️
        sx={{
          "&:hover": {
            textDecoration: "none",
          },
        }}
      >
        <ListItem
          display={"flex"}
          alignItems={"center"}
          gap={isCollapsed ? 1 : 2}
          mr={4}
          ml={{
            base: isChild ? 4 : 2,
            md: isChild ? 4 : 2,
          }}
          mb={3}
          p={2}
          borderRadius={"md"}
          bgColor={
            activeParent || showDropdown
              ? "primary.400"
              : active
              ? "primary.500"
              : ""
          }
          color={activeTab ? "white" : "gray.500"}
          transition="all ease-in-out"
          sx={{
            "&:hover": {
              bgColor: "primary.300",
              color: "white",
              "svg path": {
                stroke: name !== "Logout" ? "white" : "",
              },
            },
          }}
          onClick={() => !!setShowDropdown && setShowDropdown((prev) => !prev)}
          fontSize="md"
          fontWeight="semibold"
        >
          <ComponentIcon strokeWidth={0} />
          {!isCollapsed && <Text whiteSpace="nowrap">{name}</Text>}

          {(!!children || to === "") && (
            <Icon
              as={RightArrowIcon}
              transform={showDropdown ? "rotate(90deg)" : ""}
              sx={{
                path: {
                  stroke: activeTab ? "white" : "",
                },
              }}
            />
          )}
        </ListItem>
      </Link>
      {children}
    </>
  );
};

export default Item;
