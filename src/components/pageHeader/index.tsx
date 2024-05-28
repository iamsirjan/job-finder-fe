import {
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Text,
  Tooltip,
  useMultiStyleConfig,
  VStack,
} from '@chakra-ui/react';
import { CSSProperties, ReactNode } from 'react';

import { FilterIcon } from 'assets';
import { ListingButton } from 'components/button/ListingButton';
import { IconButton } from 'components/button/IconButton';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { VARIANT } from 'components/types';
import { Search } from 'components/search';

type Props = {
  title: string;
  desc: ReactNode;
  search: boolean;
  searchValue?: string;
  searchDisabled?: boolean;
  filter: boolean;
  filterDisabled?: boolean;
  /** Enable this to show a red dot above filter icon */
  isFilterApplied?: boolean;
  button: string;
  buttonDisabled?: boolean;
  buttonLoading?: boolean;
  secondaryButton?: string;
  secondaryButtonVariant?: VARIANT;
  secondaryButtonDisabled?: boolean;
  onSearch: (value: string) => void;
  onFilter: (event: React.MouseEvent<HTMLElement>) => void;
  onButtonClick: (event: React.MouseEvent<HTMLElement>) => void;
  onSecondaryButtonClick?: (event: React.MouseEvent<HTMLElement>) => void;
  disableTopPadding?: boolean;
  children?: ReactNode;
};

export const PageHeader = ({
  title,
  desc,
  search,
  searchValue,
  searchDisabled,
  filter,
  filterDisabled,
  isFilterApplied,
  button,
  buttonDisabled,
  buttonLoading,
  secondaryButton,
  secondaryButtonVariant,
  secondaryButtonDisabled,
  onSearch,
  onFilter,
  onButtonClick,
  onSecondaryButtonClick,
  disableTopPadding,
  children,
}: Partial<Props>) => {
  const styles = useMultiStyleConfig('PageHeader', {});
  const boxStyle = { ...styles.box, ...(disableTopPadding ? { pt: 0 } : null) };
  const renderDivider = (search || filter) && (!!button || !!secondaryButton);

  return (
    <VStack align="stretch" sx={{ ...boxStyle }}>
      <Flex justifyContent="space-between">
        <Tooltip label={title ?? ''} placement="top">
          <Text maxW="60vw" isTruncated variant="h1">
            {title}
          </Text>
        </Tooltip>
        <HStack sx={{ ...styles.buttonContainer }} spacing={0}>
          {search && (
            <Box>
              <Search
                iconStyle={{ height: '36px', width: '36px' }}
                onSearch={onSearch}
                isDisabled={searchDisabled}
                searchValue={searchValue}
              />
            </Box>
          )}
          {filter && (
            <Box sx={styles.filterContainer}>
              <IconButton
                aria-label="Filter"
                variant="header"
                style={{ height: '36px', width: '36px' }}
                icon={
                  <FilterIcon
                    style={{ width: 16, height: 16, margin: 'auto' }}
                  />
                }
                onClick={onFilter}
                isDisabled={filterDisabled}
              />
              {isFilterApplied && (
                <CheckCircleIcon
                  style={{ ...(styles.filterIndicator as CSSProperties) }}
                />
              )}
            </Box>
          )}
          {renderDivider && (
            <Center sx={{ ...styles.verticalDivider }}>
              <Divider orientation="vertical" />
            </Center>
          )}
          {secondaryButton && (
            <ListingButton
              title={secondaryButton}
              aria-label="listing button"
              variant={secondaryButtonVariant ?? 'secondary'}
              onClick={onSecondaryButtonClick}
              isDisabled={secondaryButtonDisabled}
            />
          )}
          {button && (
            <ListingButton
              title={button}
              aria-label="listing button"
              variant="create"
              onClick={onButtonClick}
              isDisabled={buttonDisabled}
              isLoading={buttonLoading}
              style={{ minWidth: '150px' }}
            />
          )}
        </HStack>
      </Flex>
      {desc && (
        <Box sx={{ ...styles.desc }}>
          <Text variant="body">{desc}</Text>
        </Box>
      )}
      {children}
    </VStack>
  );
};
