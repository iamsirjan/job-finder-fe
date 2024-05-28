import {
  Box,
  CircularProgress,
  CSSObject,
  Flex,
  Table as CTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  OnChangeFn,
  PaginationState,
  Row,
  useReactTable,
} from '@tanstack/react-table';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import qs, { ParsedQuery } from 'query-string';

import Pagination from './pagination';

export type HoverComponentProps<T extends Record<string, unknown>> = {
  row: Row<T>;
  onMouseEnter: () => void;
};

type Pagination = { pageIndex: number; pageSize: number };
export const usePaginationParams = ({ enabled }: { enabled: boolean }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = qs.parse(location.search) as ParsedQuery<string>;
  const [page, size] = [Number(query['page']), Number(query['size'])];

  const paginationInfo = useMemo(() => {
    return {
      pageIndex: page || 0,
      pageSize: size || 10,
    };
  }, [page, size]);

  const [pagination, setPagination] = useState({
    pageIndex: paginationInfo.pageIndex,
    pageSize: paginationInfo.pageSize,
  });

  const updatePagination = (pagination: Pagination) => {
    const routeConfig = {
      pathname: location.pathname,
      search: qs.stringifyUrl({
        url: location.search,
        query: { page: pagination.pageIndex, size: pagination.pageSize },
      }),
    };

    if (page !== pagination.pageIndex || size !== pagination.pageSize) {
      if (page || size) {
        navigate(routeConfig);
      } else {
        navigate(routeConfig);
      }
    }
  };

  useEffect(() => {
    if (enabled) updatePagination(pagination);
  }, [enabled, pagination]);

  return { setPagination, paginationInfo };
};

type Props<T extends Record<string, unknown>> = {
  columns: ColumnDef<T, any>[];
  data: T[];
  isLoading?: boolean;
  globalFilterValue?: string;
  pageSize?: number;
  pageIndex?: number;
  pageCount?: number;
  onPaginationChange?: OnChangeFn<PaginationState>;
  hidePagination?: boolean;
  hoverComponent?: (props: HoverComponentProps<T>) => ReactElement | null;
  headerStyle?: CSSObject;
  bodyStyle?: CSSObject;
  showNumberBasedPagination?: boolean;
};

export const Table = <T extends Record<string, unknown>>(props: Props<T>) => {
  const HoverComponent = props.hoverComponent;
  const showNumberBasedPagination = props?.showNumberBasedPagination ?? false;

  const [globalFilter, setGlobalFilter] = useState('');
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const styles = useMultiStyleConfig('Table', {
    headerStyle: props.headerStyle,
    bodyStyle: props.bodyStyle,
  });

  const tableInstance = useReactTable({
    columns: props.columns,
    data: props.data,
    state: {
      globalFilter: globalFilter,
      pagination: {
        pageIndex: props.pageIndex || 0,
        pageSize: props.pageSize || 10,
      },
    },
    pageCount: Math.ceil((props.pageCount ?? 0) / (props.pageSize ?? 20)),
    manualPagination: true,
    onPaginationChange: props.onPaginationChange,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  useEffect(() => {
    setGlobalFilter(props.globalFilterValue || '');
  }, [props.globalFilterValue]);

  return (
    <Box w="full" h="inherit">
      <Box overflowY="auto">
        <CTable sx={styles.table}>
          <Thead>
            {tableInstance.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id} sx={styles.header}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody sx={styles.tbody}>
            {props.isLoading && (
              <Tr sx={styles.loadingRow}>
                <Td
                  colSpan={props.columns.length}
                  rowSpan={tableInstance.getRowModel().rows.length}
                  sx={{
                    ...styles.bodyCell,
                    ...styles.loadingCell,
                  }}
                >
                  <Flex sx={styles.loadingContainer}>
                    <CircularProgress isIndeterminate />
                  </Flex>
                </Td>
              </Tr>
            )}

            {!props.isLoading && !tableInstance.getRowModel().rows.length && (
              <Tr>
                <Td
                  colSpan={props.columns.length}
                  sx={{ ...styles.bodyCell, ...styles.emptyCell }}
                >
                  No records
                </Td>
              </Tr>
            )}

            {tableInstance.getRowModel().rows.map((row) => {
              return (
                <Tr
                  pos="relative"
                  key={row.id}
                  onMouseEnter={() => HoverComponent && setHoveredRow(row.id)}
                  onMouseLeave={() => HoverComponent && setHoveredRow(null)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <Td
                      key={cell.id}
                      sx={
                        hoveredRow === row.id
                          ? { ...styles.bodyCell, ...styles.hoverRow }
                          : styles.bodyCell
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Td>
                  ))}

                  {/* Show this view on hover */}
                  {HoverComponent && hoveredRow === row.id ? (
                    <Td
                      p={0}
                      sx={styles.hoverCell}
                      colSpan={props.columns.length}
                    >
                      <Flex sx={styles.hoverContent}>
                        <HoverComponent
                          row={row}
                          onMouseEnter={() => setHoveredRow(row.id)}
                        />
                      </Flex>
                    </Td>
                  ) : null}
                </Tr>
              );
            })}
          </Tbody>
        </CTable>
      </Box>

      {/* {!props.hidePagination && (
        <Pagination
          pageIndex={tableInstance.getState().pagination.pageIndex}
          pageSize={tableInstance.getState().pagination.pageSize}
          canNextPage={tableInstance.getCanNextPage()}
          onNextPage={tableInstance.nextPage}
          canPreviousPage={tableInstance.getCanPreviousPage()}
          onPreviousPage={tableInstance.previousPage}
          onPageSizeChange={(pageSize) => tableInstance.setPageSize(pageSize)}
          pageCount={tableInstance.getPageCount()}
          gotoPage={(page: number) => tableInstance.setPageIndex(page - 1)}
          showNumberBasedPagination={showNumberBasedPagination}
        />
      )} */}
    </Box>
  );
};

export default Table;
