import { ColumnDef, Row } from '@tanstack/react-table';
import { IVacancyResponse } from './interface';
import { FormButton } from 'components/button/FormButton';
import { HStack, Text } from '@chakra-ui/react';
import { useMemo } from 'react';

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
        header: 'Index',
        cell: ({ row }) => <Text>{row.index + 1}</Text>,
      },
      {
        header: 'Grade',
        cell: ({ row }) => <Text>{row.original.grade}</Text>,
      },
      {
        header: 'Subject',
        cell: ({ row }) => <Text>{row.original.subject}</Text>,
      },
      {
        header: 'Experience',
        cell: ({ row }) => (
          <Text>
            {row.original.allow_fresher
              ? 'allow fresher'
              : row.original.experience_in_years}
          </Text>
        ),
      },
      {
        header: 'Job Type',
        cell: ({ row }) => <Text>{row.original.job_type}</Text>,
      },
      {
        header: 'Last Date',
        cell: ({ row }) => <Text>{row.original.to_date}</Text>,
      },
    ],
    [],
  );

  return columns;
};
