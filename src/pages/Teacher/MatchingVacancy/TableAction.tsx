import { ColumnDef, Row } from '@tanstack/react-table';
import { FormButton } from 'components/button/FormButton';
import { HStack, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { IVacancyMatchingResponse } from 'service/service-matching-vacancy';

type MatchedData = IVacancyMatchingResponse['data'][number];

type Props = {
  onDelete: ({ id }: { id: string }) => void;
  onEdit: ({ id }: { id: string }) => void;
};

export type HoverComponentProps<T extends Record<string, unknown>> = {
  row: Row<T>;
  onMouseEnter: () => void;
};

export const HoverComponent = (
  props: HoverComponentProps<MatchedData> & Props,
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

export const useGetMatchingColumn = () => {
  const columns = useMemo<ColumnDef<MatchedData, any>[]>(
    () => [
      {
        header: 'Index',
        cell: ({ row }) => <Text>{row.index + 1}</Text>,
      },
      {
        header: 'Vacancy',
        cell: ({ row }) => <Text>{row.original.id}</Text>,
      },
      {
        header: 'Organization',
        cell: ({ row }) => (
          <Text>{row.original.organization.organization_detail.name}</Text>
        ),
      },
      {
        header: 'Address',
        cell: ({ row }) => (
          <Text>{row.original.organization.organization_detail.address}</Text>
        ),
      },
      {
        header: 'Subject',
        cell: ({ row }) => (
          <Text>{row.original.subject.map((data) => data + ' ')}</Text>
        ),
      },
      {
        header: 'Salary per Period',
        cell: ({ row }) => <Text>{row.original.salary_per_period}</Text>,
      },
      {
        header: 'accepted',
        cell: ({ row }) => (
          <Text>{row.original.is_active ? 'Accepted' : 'Not Accepted'}</Text>
        ),
      },
    ],
    [],
  );

  return columns;
};
