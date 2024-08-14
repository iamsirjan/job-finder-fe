import { ColumnDef, Row } from '@tanstack/react-table';
import { IVacancyResponse } from './interface';
import { FormButton } from 'components/button/FormButton';
import { Badge, Box, HStack, Switch, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { jobTypeMap } from 'pages/Register/TeacherRegistration/firstStep/constant';
import { FaCheck } from 'react-icons/fa6';
import { RxCross1 } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import { NAVIGATION_ROUTES } from 'route/routes.constant';
type VacancyData = IVacancyResponse['data'][number];

type Props = {
  onDelete: ({ id }: { id: string }) => void;
  onEdit: ({ id }: { id: string }) => void;
};

export type HoverComponentProps<T extends Record<string, unknown>> = {
  row: Row<T>;
  onMouseEnter: () => void;
};

export const HoverComponent = (
  props: HoverComponentProps<VacancyData> & Props,
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

export const useVacancyColumn = () => {
  const columns = useMemo<ColumnDef<VacancyData, any>[]>(
    () => [
      {
        header: 'Vacancy',
        cell: ({ row }) => (
          <Link
            to={NAVIGATION_ROUTES.VACANCY.DETAILS.replace(
              ':id',
              row.original.id,
            )}
          >
            <Text cursor="pointer" color="brand.blueActive">
              {row.original.name}
            </Text>
          </Link>
        ),
      },
      {
        header: 'Grade',
        cell: ({ row }) => (
          <Text>
            {row.original.grade.map((data, i) => (
              <Badge key={i} colorScheme="green">
                {data}
              </Badge>
            ))}
          </Text>
        ),
      },
      {
        header: 'Subject',
        cell: ({ row }) => (
          <Text>
            {row.original.subject.map((data, i) => (
              <Badge key={i} mx={1} colorScheme="red">
                {data}
              </Badge>
            ))}
          </Text>
        ),
      },
      {
        header: 'No Of Applications',
        cell: ({ row }) => (
          <Badge colorScheme="purple">
            {row.original.no_of_applicants} Applications
          </Badge>
        ),
      },
      {
        header: 'Lodging',
        cell: ({ row }) => (
          <Box>
            {row.original.lodging ? (
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
            {row.original.fooding ? (
              <FaCheck color="green" fontSize={'30px'} />
            ) : (
              <RxCross1 color="red" fontSize={'30px'} />
            )}
          </Box>
        ),
      },
      {
        header: 'Status',
        cell: ({ row }) => (
          <Switch
            size="md"
            isChecked={row.original.is_active}
            // onChange={e => handleSwitchChange(row.original.enabled, row.original.id)}
          />
        ),
      },
      {
        header: 'Job Type',
        cell: ({ row }) => <Text>{jobTypeMap[row.original.job_type]}</Text>,
      },
      // {
      //   header: 'Last Date',
      //   cell: ({ row }) => <Text>{row.original.to_date}</Text>,
      // },
    ],
    [],
  );

  return columns;
};
