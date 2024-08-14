import { ColumnDef, Row } from '@tanstack/react-table';
import { FormButton } from 'components/button/FormButton';
import { Badge, Box, HStack, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { GetOffered } from 'service/service-offer-teacher';
import { NAVIGATION_ROUTES } from 'route/routes.constant';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';

type SentData = GetOffered['data'][number];

type Props = {
  onDelete: ({ id }: { id: string }) => void;
  onEdit: ({ id }: { id: string }) => void;
};

export type HoverComponentProps<T extends Record<string, unknown>> = {
  row: Row<T>;
  onMouseEnter: () => void;
};

export const HoverComponent = (
  props: HoverComponentProps<SentData> & Props,
) => {
  return (
    <HStack gap="0.5rem">
      <FormButton
        variant="outline-danger"
        title="Delete"
        onClick={() =>
          props.onDelete({
            id: props.row.original.id,
          })
        }
      />
      <FormButton
        variant="primary"
        title="Edit"
        onClick={() =>
          props.onEdit({
            id: props.row.original.id,
          })
        }
      />
    </HStack>
  );
};

export const useSentChatColumnn = () => {
  const columns = useMemo<ColumnDef<SentData, any>[]>(
    () => [
      {
        header: 'Index',
        cell: ({ row }) => <Text>{row.index + 1}</Text>,
      },
      {
        header: 'Vacancy',
        cell: ({ row }) => (
          <Link
            to={NAVIGATION_ROUTES.VACANCY.DETAILS.replace(
              ':id',
              row.original.vacancy.id,
            )}
          >
            <Text cursor="pointer" color="brand.blueActive">
              {row.original.vacancy.name}
            </Text>
          </Link>
        ),
      },

      {
        header: 'Address',
        cell: ({ row }) => (
          <Text>
            {row.original.vacancy.organization.organization_detail.address}
          </Text>
        ),
      },
      {
        header: 'Salary',
        cell: ({ row }) => (
          <Text>
            <Badge colorScheme="purple">
              Rs. {row.original.vacancy.salary_per_period}
            </Badge>
          </Text>
        ),
      },
      {
        header: 'Experience',
        cell: ({ row }) => (
          <Badge color="green">
            {row.original.vacancy.experience_in_years} years
          </Badge>
        ),
      },
      {
        header: 'Lodging',
        cell: ({ row }) => (
          <Box>
            {row.original.vacancy.lodging ? (
              <FaCheck color="green" fontSize={'30px'} />
            ) : (
              <RxCross1 color="red" fontSize={'30px'} />
            )}
          </Box>
        ),
      },
      {
        header: 'Fooding',
        cell: ({ row }) => (
          <Box>
            {row.original.vacancy.fooding ? (
              <FaCheck color="green" fontSize={'30px'} />
            ) : (
              <RxCross1 color="red" fontSize={'30px'} />
            )}
          </Box>
        ),
      },
      {
        header: 'Application  Status',
        cell: ({ row }) => (
          <Text>
            {row.original.vacancy.vacancy_application[0].status === '2' ? (
              <Badge variant="solid">Pending</Badge>
            ) : row.original.vacancy.vacancy_application[0].status === '3' ? (
              <Badge variant="solid" colorScheme="red">
                REJECTED
              </Badge>
            ) : row.original.vacancy.vacancy_application[0].status === '1' ? (
              <Badge variant="solid" colorScheme="purple">
                Scheduled FOR INTERVIEW
              </Badge>
            ) : (
              <Badge variant="solid" colorScheme="green">
                HIRED
              </Badge>
            )}
          </Text>
        ),
      },
      {
        header: 'Check Application',
        cell: ({ row }) => (
          <Link
            to={NAVIGATION_ROUTES.APPLICANTDETAILS.replace(
              ':id',
              row.original.vacancy.vacancy_application[0].id,
            )}
          >
            <Text cursor="pointer" color="brand.blueActive">
              Application Details
            </Text>
          </Link>
        ),
      },
    ],
    [],
  );

  return columns;
};
