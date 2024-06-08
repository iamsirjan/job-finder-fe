import { extendTheme } from '@chakra-ui/react';
import { THEME_COLORS } from './color';
import { fontSizes } from './fontsize';
import { LayoutTheme } from './Layout.theme';
import { PageHeaderTheme } from './PageHeader.theme';
import { IconButtonTheme } from './IconButton.theme';
import { TableTheme } from './Table.theme';
import { FormButtonTheme } from './button-theme/FormButton.theme';
import { SmallButtonTheme } from './button-theme/SmallButton.theme';
import { SearchTheme } from './Search.theme';
import { ListingButtonTheme } from './button-theme/ListingButton.theme';
import { buttonTheme } from './button';
import { FormFieldTheme } from './FormField.theme';

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        background: '#efefef',
        fontFamily: 'Mulish',
      },
    },
  },
  fontSizes,
  colors: THEME_COLORS,
  borderRadius: {
    radii: {
      none: '0',
      sm: '0.125rem', //2px
      base: '0.25rem', //4px
      md: '0.375rem', //6px
      lg: '0.5rem', //8px
      xl: '0.75rem', //12px
      '2xl': '1rem', //16px
      '3xl': '1.5rem', //24px
      '4xl': '1.875rem', //30px
      '5xl': '2rem', //32px
      '6xl': '2.25rem', // 36px
      '7xl': '5rem', // 80px

      full: '9999px',
    },
  },
  components: {
    Button: buttonTheme,
    Layout: LayoutTheme,
    PageHeader: PageHeaderTheme,
    ListingButton: ListingButtonTheme,
    Table: TableTheme,
    FormButton: FormButtonTheme,
    IconButton: IconButtonTheme,
    SmallButton: SmallButtonTheme,
    Search: SearchTheme,
    FormField: FormFieldTheme,
  },
});
