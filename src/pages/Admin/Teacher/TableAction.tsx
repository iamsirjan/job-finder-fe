import { EditIcon } from '@chakra-ui/icons';
import { Box, Flex, HStack, Text, Tooltip } from '@chakra-ui/react';
import { ColumnDef, Row } from '@tanstack/react-table';
import { FormButton } from 'components/button/FormButton';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { NAVIGATION_ROUTES } from 'route/routes.constant';
import { IAllTeacherDetail } from 'service/service-teacher-register';

type TeacherData = IAllTeacherDetail['data'][number];

type Props = {
  onDelete: ({ id }: { id: string }) => void;
  onEdit: ({ id }: { id: string }) => void;
};

export type HoverComponentProps<T extends Record<string, unknown>> = {
  row: Row<T>;
  onMouseEnter: () => void;
};

export const HoverComponent = (
  props: HoverComponentProps<TeacherData> & Props,
) => {
  return (
    <HStack gap="0.5rem">
      <FormButton
        variant="outline-danger"
        title="Delete"
        onClick={() =>
          props.onDelete({
            id: props.row.original.teacher.id,
          })
        }
      />
      <FormButton
        variant="primary"
        title="Edit"
        onClick={() =>
          props.onEdit({
            id: props.row.original.teacher.id,
          })
        }
      />
    </HStack>
  );
};

export const useTeacherColumn = () => {
  const columns = useMemo<ColumnDef<TeacherData, any>[]>(
    () => [
      {
        header: 'Index',
        cell: ({ row }) => <Text>{row.index + 1}</Text>,
      },
      {
        header: 'Name',
        cell: ({ row }) => (
          <Link
            to={NAVIGATION_ROUTES.TEACHERDETAILS.replace(
              ':id',
              row.original.user_profile.id,
            )}
          >
            <Text>
              {row.original.user_profile.first_name}{' '}
              {row.original.user_profile.last_name}
            </Text>
          </Link>
        ),
      },

      {
        header: 'Email',
        cell: ({ row }) => (
          <Text>{row.original.user_profile.user_details.email} </Text>
        ),
      },

      {
        header: 'Phone Number',
        cell: ({ row }) => (
          <Text>{row.original.user_profile.user_details.phone} </Text>
        ),
      },
      {
        header: 'Gender',
        cell: ({ row }) => (
          <Text>
            {row.original.user_profile.gender === '1' ? 'Male' : 'Female'}{' '}
          </Text>
        ),
      },
      {
        header: 'Address',
        cell: ({ row }) => (
          <Text>{row.original.user_profile.user_details.address} </Text>
        ),
      },
      {
        header: 'Action',
        cell: ({ row }) => (
          <Flex alignItems={'center'} gap={2}>
            <Tooltip label="Edit Teacher">
              <Box>
                <Link
                  to={NAVIGATION_ROUTES.TEACHER.EDITTEACHER.replace(
                    ':id',
                    row.original.user_profile.id,
                  )}
                >
                  <EditIcon cursor={'pointer'} fontSize={'18px'} />
                </Link>
              </Box>
            </Tooltip>
          </Flex>
        ),
      },
    ],
    [],
  );
  return columns;
};
