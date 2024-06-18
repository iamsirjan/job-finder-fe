import type { ComponentStyleConfig } from '@chakra-ui/theme';

export const FrameWorkDropdownTheme: ComponentStyleConfig = {
  baseStyle: ({ isInvalid, isDisabled }) => ({
    container: {
      width: '100%',
    },
    input: {
      color: 'inherit',
      lineHeight: 1,
    },
    menu: {
      fontSize: '0.75rem',
      boxShadow: 'none',
      zIndex: 2,
    },
    menuList: {
      borderWidth: '0.75px',
      borderStyle: 'solid',
      borderColor: 'secondary.200',
      borderRadius: '4.5px',
      padding: 0,
    },
    option: {
      ':hover': {
        backgroundColor: 'primary.100',
      },
    },
    optionActive: {
      backgroundColor: 'primary.100',
      color: 'secondary.1000',
    },
    control: {
      boxShadow: 'none',
      minHeight: '1.875rem',
      borderColor: isInvalid ? 'form.error' : 'secondary.200',
      ':hover': {
        borderColor: 'brand.blue',
      },
      backgroundColor: isDisabled ? 'secondary.100' : undefined,
      opacity: isDisabled ? 0.5 : 1,
    },
    dropdownIndicator: {
      padding: '0.375rem',
    },
    valueContainer: {
      fontSize: '0.75rem',
      padding: '0 0.5625rem',
      '& *': {
        fontFamily: 'Mulish',
      },
    },
    indicatorSeparator: {
      display: 'none',
    },
    indicatorsContainer: {
      '& svg': {
        width: '0.9375rem',
        height: '0.9375rem',
        fill: 'secondary.1000',
      },
    },
    noOptionsMessage: { padding: '0.375rem 0.75rem' },
    selectLabel: {
      '& > span': {
        width: '1.125rem',
        height: '1.125rem',
      },
    },
  }),
  // Disabled lg size
  // sizes: {
  //   lg: {
  //     menu: {
  //       fontSize: '1rem',
  //     },
  //     control: {
  //       minHeight: '2.5rem',
  //     },
  //     valueContainer: {
  //       fontSize: '1rem',
  //     },
  //     selectLabel: {
  //       '& > span': {
  //         width: '1.5rem',
  //         height: '1.5rem',
  //       },
  //     },
  //   },
  // },
};
