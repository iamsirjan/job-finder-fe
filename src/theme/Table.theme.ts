import type { ComponentStyleConfig } from '@chakra-ui/theme';

export const TableTheme: ComponentStyleConfig = {
  baseStyle: (props) => {
    const { headerStyles, bodyStyles } = props;

    return {
      table: {
        width: '100%',

        '& tr': {
          _hover: {
            'a > p': {
              color: 'brand.blue',
            },
          },
        },
      },
      tbody: {
        position: 'relative',
      },
      loadingRow: {
        position: 'absolute',
        top: 0,
        left: 0,
        h: 'full',
        w: 'full',
        zIndex: 1,
      },
      loadingCell: {
        position: 'absolute',
        width: 'inherit',
        height: 'inherit',
        background: 'table.loader',
        textAlign: 'center',
        borderBottom: 'none',
        boxShadow: 'none',
      },
      loadingContainer: {
        height: 'inherit',
        justifyContent: 'center',
        alignItems: 'center',
        m: '0.75rem',
      },
      hoverRow: {
        bg: 'primary.200',
      },
      hoverCell: {
        zIndex: 1,
        right: 0,
        height: '100%',
        position: 'absolute',
      },
      hoverContent: {
        bg: 'inherit',
        height: '100%',
        justifyContent: 'flex-end',
        p: '1rem 2rem 1rem 1rem',
      },
      emptyCell: {
        textAlign: 'center',
      },
      bodyCell: {
        margin: 0,
        padding: '0.875rem 1.5rem',
        fontWeight: 400,
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: 'secondary.200',
        color: 'secondary.1000',
        boxShadow: 'none',
        fontSize: '14px',
        bg: 'brand.white',
        ...bodyStyles,
      },
      header: {
        position: 'sticky',
        bg: 'secondary.150',
        margin: 0,
        padding: '0.875rem 1.5rem',
        zIndex: 1,
        top: 0,
        fontWeight: 800,
        lineHeight: '9px',
        letterSpacing: 'wider',
        color: 'secondary.700',
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: 'secondary.200',
        textTransform: 'uppercase',
        '&:first-of-type': {
          bg: `linear-gradient(90deg, secondary.200 8.33%, secondary.150 17.4%)`,
        },
        '&:last-of-type': {
          bg: `linear-gradient(90deg, secondary.150 87.11%, secondary.200 100%)`,
        },
        ...headerStyles,
      },
    };
  },
  sizes: {
    md: () => {
      return {
        bodyCell: {
          fontSize: '0.75rem',
          lineHeight: '1.1875rem',
        },
        header: {
          fontSize: '0.625rem',
        },
      };
    },
    lg: () => {
      return {
        bodyCell: {
          fontSize: '1.125rem',
          lineHeight: '1.5625rem',
        },
        header: {
          fontSize: '0.875rem',
        },
      };
    },
  },
  defaultProps: {
    size: 'md',
    variant: null,
  },
};
