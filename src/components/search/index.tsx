import {
  Box,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import { SearchIconBlue } from 'assets';
import { IconButton } from 'components/button/IconButton';
import { ListingButton } from 'components/button/ListingButton';
import { ChangeEvent, useEffect, useState } from 'react';

export const Search = ({
  searchValue,
  onSearch,
  iconStyle,
  isDisabled,
  hasAutoFocus = true,
  showSearchBarOnly = false,
}: {
  searchValue?: string;
  onSearch?: (value: string) => void;
  isDisabled?: boolean;
  hasAutoFocus?: boolean;
  showSearchBarOnly?: boolean;
  iconStyle?: any;
}) => {
  const styles = useMultiStyleConfig('Search', {});
  const [search, toggleSearch] = useState(!!searchValue);
  const [text, updateText] = useState('');
  const [isFocued, setIsFocused] = useState<boolean>(false);

  const onTextSearch = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch?.(e.target.value);
    updateText(e.target.value);
  };

  const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      onReset();
    }
    setIsFocused(false);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onReset = () => {
    onSearch?.('');
    updateText('');
    if (!showSearchBarOnly) {
      toggleSearch(false);
    }
  };

  useEffect(() => {
    updateText(searchValue ?? '');
  }, [searchValue]);

  return (
    <>
      {showSearchBarOnly || search ? (
        <InputGroup sx={{ ...styles.inputGroup }}>
          <Box
            style={{
              padding: 2,
              borderRadius: 4,
              backgroundColor: isFocued ? 'rgb(228, 242, 255)' : 'transparent',
              width: '100%',
            }}
          >
            <Input
              type="text"
              value={text}
              onChange={onTextSearch}
              onBlur={onBlur}
              onFocus={onFocus}
              isDisabled={isDisabled}
              height="32px"
              placeholder="Search"
              pr="70px"
              autoFocus={hasAutoFocus}
            />
          </Box>
          <InputRightElement w="70px" p={1} justifyContent="flex-end">
            <HStack spacing={0} flexDir="row-reverse" mt={1.5}>
              <IconButton
                aria-label="Search"
                variant="header-ghost"
                icon={
                  <SearchIconBlue
                    style={{ width: 16, height: 16, margin: 'auto' }}
                  />
                }
                isDisabled={isDisabled}
                sx={{ ...styles.icon }}
                // Disable key navigation
                tabIndex={-1}
              />
              {!!text && (
                <ListingButton
                  title="Clear"
                  aria-label="clear button"
                  variant="ghost"
                  fontWeight={'extrabold'}
                  onClick={onReset}
                  isDisabled={isDisabled}
                />
              )}
            </HStack>
          </InputRightElement>
        </InputGroup>
      ) : (
        <IconButton
          aria-label="Search"
          icon={
            <SearchIconBlue style={{ width: 16, height: 16, margin: 'auto' }} />
          }
          isDisabled={isDisabled}
          style={{ ...iconStyle }}
          sx={{ ...styles.icon }}
          onClick={() => toggleSearch(true)}
        />
      )}
    </>
  );
};
