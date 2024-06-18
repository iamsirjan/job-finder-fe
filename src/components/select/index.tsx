import { Box, useBreakpointValue, useMultiStyleConfig } from '@chakra-ui/react';
import { forwardRef, PropsWithChildren } from 'react';
import ReactSelect, {
  ControlProps,
  CSSObjectWithLabel,
  GroupBase,
  MenuListProps,
  StylesConfig,
} from 'react-select';
import Select from 'react-select/base';
import CreatableSelect, { CreatableProps } from 'react-select/creatable';

// eslint-disable @typescript-eslint/ban-types
declare module 'react' {
  function forwardRef<T, P = Record<string, never>>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null,
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

function MenuList<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: PropsWithChildren<MenuListProps<Option, IsMulti, Group>>) {
  return (
    <Box {...props.innerProps} sx={{ ...props.getStyles('menuList', props) }}>
      {props.children}
    </Box>
  );
}

function Control<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: PropsWithChildren<ControlProps<Option, IsMulti, Group>>) {
  return (
    <Box
      sx={{ ...props.getStyles('control', props) }}
      {...props.innerProps}
      ref={props.innerRef}
    >
      {props.children}
    </Box>
  );
}

export type DropdownOverrideStyle = CSSObjectWithLabel;

export interface Props<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> extends CreatableProps<Option, IsMulti, Group> {
  isInvalid?: boolean;
  isCreatable?: boolean;
  overrideStyles?: Partial<
    Record<keyof StylesConfig, Partial<CSSObjectWithLabel>>
  >;
}

const FrameWorkDropdown = forwardRef(function <
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  {
    isInvalid,
    isCreatable,
    overrideStyles,
    ...rest
  }: Props<Option, IsMulti, Group>,
  ref: React.ForwardedRef<Select<Option, IsMulti, Group>>,
) {
  const size = useBreakpointValue({ base: 'md', lg: 'lg' });
  const multiConfigs = useMultiStyleConfig('FrameWorkDropdown', {
    size,
    isInvalid,
    isDisabled: rest.isDisabled,
  }) as Record<keyof StylesConfig, CSSObjectWithLabel>;

  const compose =
    (component: keyof StylesConfig) => (provided: CSSObjectWithLabel) => ({
      ...provided,
      ...multiConfigs[component],
      ...(overrideStyles ? overrideStyles[component] : {}),
    });

  const styles: StylesConfig<Option, IsMulti, Group> = {
    container: compose('container'),
    input: (provided, { selectProps: { inputValue, isMulti } }) => ({
      ...provided,
      ...(!(inputValue || isMulti) ? { position: 'absolute' } : {}),
      ...compose('input'),
    }),
    menu: compose('menu'),
    menuList: compose('menuList'),
    option: compose('option'),
    control: compose('control'),
    dropdownIndicator: compose('dropdownIndicator'),
    valueContainer: compose('valueContainer'),
    indicatorSeparator: compose('indicatorSeparator'),
    indicatorsContainer: compose('indicatorsContainer'),
    noOptionsMessage: compose('noOptionsMessage'),
  };

  const selectProps = {
    placeholder: 'Select',
    ...rest,
    ref,
    styles,
    components: { Control, MenuList, ...rest.components },
  };

  return isCreatable ? (
    <CreatableSelect {...selectProps} />
  ) : (
    <ReactSelect {...selectProps} />
  );
});

export default FrameWorkDropdown;
