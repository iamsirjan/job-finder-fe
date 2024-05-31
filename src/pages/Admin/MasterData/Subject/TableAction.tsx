import { HStack, Text } from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/table-core';
import { useMemo } from 'react';
import { Row } from '@tanstack/react-table';
import { FormButton } from 'components/button/FormButton';
import { ISubjectResponse } from 'service/master/service-subject';

type SubjectData = ISubjectResponse['results'][number];

type Props = {
  onDelete: ({ id }: { id: string }) => void;
  onEdit: ({ id }: { id: string }) => void;
};

export type HoverComponentProps<T extends Record<string, unknown>> = {
  row: Row<T>;
  onMouseEnter: () => void;
};

export const HoverComponent = (
  props: HoverComponentProps<SubjectData> & Props,
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

export const useSubjectColumn = () => {
  const columns = useMemo<ColumnDef<SubjectData, any>[]>(
    () => [
      {
        header: 'Index',
        cell: ({ row }) => <Text>{row.index + 1}</Text>,
      },
      {
        header: 'Name',
        cell: ({ row }) => <Text>{row.original.name}</Text>,
      },
    ],
    [],
  );

  return columns;
};
