import { MdAddCircle } from 'react-icons/md';
import { Box, Flex, Text, Tooltip } from '@chakra-ui/react';
import { ColumnDef, Row } from '@tanstack/react-table';
import { OrganizationTypes } from 'pages/Register/OrganizationRegistration/firstStep/constant';
import { useMemo } from 'react';
import { IOrgList } from 'service/service-organization-register';
import { useCommonStore } from 'state/common.state';
import { EditIcon } from '@chakra-ui/icons';
import { NAVIGATION_ROUTES } from 'route/routes.constant';
import { Link } from 'react-router-dom';

type OrgData = IOrgList['data'][number];

export type HoverComponentProps<T extends Record<string, unknown>> = {
  row: Row<T>;
  onMouseEnter: () => void;
};

const getLabelFromValue = (value: string) => {
  const type = OrganizationTypes.find((orgType) => orgType.value === value);
  return type ? type.label : null;
};

export const useOrgColumn = () => {
  const columns = useMemo<ColumnDef<OrgData, any>[]>(
    () => [
      {
        header: 'Index',
        cell: ({ row }) => <Text>{row.index + 1}</Text>,
      },
      {
        header: 'Organization Name',
        cell: ({ row }) => (
          <Link
            to={NAVIGATION_ROUTES.ORGANIZATIONDETAILS.replace(
              ':id',
              row.original.organization_detail.id,
            )}
          >
            {' '}
            <Text>{row.original.organization_detail.name}</Text>
          </Link>
        ),
      },
      {
        header: 'Organization Type',
        cell: ({ row }) => (
          <Text>
            {getLabelFromValue(
              row.original.organization_detail.organization_type,
            )}{' '}
          </Text>
        ),
      },
      {
        header: 'Phone Number',
        cell: ({ row }) => (
          <Text>{row.original.organization_detail.phone_number} </Text>
        ),
      },
      {
        header: 'Pan Number',
        cell: ({ row }) => (
          <Text>{row.original.organization_detail.pan_number} </Text>
        ),
      },
      {
        header: 'Address',
        cell: ({ row }) => (
          <Text>{row.original.organization_detail.address} </Text>
        ),
      },
      {
        header: 'Action',
        cell: ({ row }) => (
          <Flex alignItems={'center'} gap={2}>
            <Tooltip label="Add Vacancy">
              <Box>
                <MdAddCircle
                  cursor={'pointer'}
                  fontSize={'18px'}
                  onClick={() => {
                    useCommonStore.getState().setDrawer(true);
                    useCommonStore
                      .getState()
                      .setOrgID(row.original.organization_detail.id);
                  }}
                />
              </Box>
            </Tooltip>

            <Tooltip label="Edit Organization">
              <Box>
                <Link
                  to={NAVIGATION_ROUTES.ORGANIZATION.EDITORGANIZATION.replace(
                    ':id',
                    row.original.organization_detail.id,
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
