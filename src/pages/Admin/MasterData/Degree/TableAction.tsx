import { HStack, Text } from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/table-core';
import { useMemo } from 'react';
import { Row } from '@tanstack/react-table';
import { FormButton } from 'components/button/FormButton';
export type DegreeResponseData = {
  data: {
    id: string;
    stream: string;
    name: string;
  }[];
  metadata: { total_count: number };
};
type DegreeData = DegreeResponseData['data'][number];

type Props = {
  onDelete: ({ id, name }: { id: string; name: string }) => void;
};

export type HoverComponentProps<T extends Record<string, unknown>> = {
  row: Row<T>;
  onMouseEnter: () => void;
};

export const HoverComponent = (
  props: HoverComponentProps<DegreeData> & Props,
) => {
  return (
    <HStack gap="0.5rem">
      <FormButton
        variant="outline-danger"
        title="Delete"
        onClick={() =>
          props.onDelete({
            id: props.row.original.id,
            name: props.row.original.name,
          })
        }
      />
    </HStack>
  );
};

export const useDegreeColumn = () => {
  const columns = useMemo<ColumnDef<DegreeData, any>[]>(
    () => [
      {
        header: 'Index',
        cell: ({ row }) => <Text>{row.index + 1}</Text>,
      },
      {
        header: 'Name',
        cell: ({ row }) => <Text>{row.original.name}</Text>,
      },
      {
        header: 'Stream',
        cell: ({ row }) => <Text>{row.original.stream}</Text>,
      },
    ],
    [],
  );

  return columns;
};
