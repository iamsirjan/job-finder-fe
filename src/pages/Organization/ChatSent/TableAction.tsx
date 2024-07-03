import { ColumnDef, Row } from '@tanstack/react-table';
import { FormButton } from 'components/button/FormButton';
import { HStack, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { DataList } from 'service/service-offer-org';

type SentData = DataList['data'][number];

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
            id: props.row.original.vacancy_application_details.id,
          })
        }
      />
      <FormButton
        variant="primary"
        title="Edit"
        onClick={() =>
          props.onEdit({
            id: props.row.original.vacancy_application_details.id,
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
          <Text>{row.original.vacancy_application_details.vacancy.id}</Text>
        ),
      },
      {
        header: 'Teacher',
        cell: ({ row }) => (
          <Text>
            {row.original.teacher_details.user_profile.first_name +
              ' ' +
              row.original.teacher_details.user_profile.last_name}
          </Text>
        ),
      },
      {
        header: 'Experience',
        cell: ({ row }) => (
          <Text>
            {row.original.teacher_details.teacher.experience_in_years}
          </Text>
        ),
      },
      {
        header: 'accepted',
        cell: ({ row }) => (
          <Text>
            {row.original.vacancy_application_details.is_accepted
              ? 'Accepted'
              : 'Not Accepted'}
          </Text>
        ),
      },
    ],
    [],
  );

  return columns;
};
