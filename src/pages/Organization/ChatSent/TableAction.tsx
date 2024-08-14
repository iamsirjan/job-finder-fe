import { ColumnDef, Row } from '@tanstack/react-table';
import {
  Avatar,
  Badge,
  Box,
  Button,
  HStack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { DataList } from 'service/service-offer-org';
import { imageURL } from 'service/service-axios';
import { FiDownload } from 'react-icons/fi';
import { FaCheck } from 'react-icons/fa6';
import { RxCross1 } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import { NAVIGATION_ROUTES } from 'route/routes.constant';
type SentData = DataList['data'][number];

type Props = {
  onStatusChange: ({ id }: { id: string }) => void;
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
      <Button
        variant={'primary'}
        onClick={() =>
          props.onStatusChange({
            id: props.row.original.vacancy_application_details.id,
          })
        }
      >
        Change Status
      </Button>
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
              row.original.vacancy_application_details.vacancy.id,
            )}
          >
            <Text cursor="pointer" color="brand.blueActive">
              {row.original.vacancy_application_details.vacancy.name}
            </Text>
          </Link>
        ),
      },
      {
        header: 'Teacher',
        cell: ({ row }) => {
          const name =
            row.original.teacher_details.user_profile.first_name +
            ' ' +
            row.original.teacher_details.user_profile.last_name;
          return (
            <Tooltip label={name}>
              <Link
                to={NAVIGATION_ROUTES.APPLICANTDETAILS.replace(
                  ':id',
                  row.original.vacancy_application_details.id,
                )}
              >
                <Avatar
                  size={'sm'}
                  name={name}
                  src={
                    imageURL +
                    row.original.teacher_details.user_profile.profile_picture
                  }
                />
              </Link>
            </Tooltip>
          );
        },
      },
      {
        header: 'No Of Periods',
        cell: ({ row }) => (
          <Text>
            <Badge colorScheme="green">
              {row.original.teacher_details.teacher.no_of_periods} Periods
            </Badge>
          </Text>
        ),
      },
      {
        header: 'Salary',
        cell: ({ row }) => (
          <Text>
            <Badge colorScheme="purple">
              rs. {row.original.teacher_details.teacher.salary_per_period}
            </Badge>
          </Text>
        ),
      },
      {
        header: 'Experience',
        cell: ({ row }) => (
          <Badge color="green">
            {row.original.teacher_details.teacher.experience_in_years} years
          </Badge>
        ),
      },
      {
        header: `Applicant's CV`,
        cell: ({ row }) => {
          const fileUrl =
            imageURL + 'media/' + row.original.teacher_details.cv[0].file;

          // Function to view the CV
          const handleView = () => {
            window.open(fileUrl, '_blank');
          };

          return (
            <HStack>
              <FiDownload
                onClick={handleView}
                cursor="pointer"
                size="1.2em"
                color="green"
                title="Download CV"
              />
            </HStack>
          );
        },
      },
      {
        header: 'Available For Tution',
        cell: ({ row }) => (
          <Box>
            {row.original.teacher_details.teacher.is_available_for_tuition ? (
              <FaCheck color="green" fontSize={'30px'} />
            ) : (
              <RxCross1 color="red" fontSize={'30px'} />
            )}
          </Box>
        ),
      },
      {
        header: 'Shift Location',
        cell: ({ row }) => (
          <Box>
            {row.original.teacher_details.teacher.can_shift_location ? (
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
            {row.original.vacancy_application_details.status === '2' ? (
              <Badge variant="solid">Pending</Badge>
            ) : row.original.vacancy_application_details.status === '3' ? (
              <Badge variant="solid" colorScheme="red">
                REJECTED
              </Badge>
            ) : row.original.vacancy_application_details.status === '1' ? (
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
    ],
    [],
  );

  return columns;
};
