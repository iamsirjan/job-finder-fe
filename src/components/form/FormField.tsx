import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { HStack, Text } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/react';
import { useMultiStyleConfig } from '@chakra-ui/system';
import { FormButton } from 'components/button/FormButton';
import React, { PropsWithChildren, useState } from 'react';

type Props = PropsWithChildren<{
  label?: string;
  error?: string;
  isRequired?: boolean;
  variant?: 'floating';
  onClearField?: () => void;
  textStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  tooltipText?: string;
}>;

export default function FormField({
  children,
  label,
  error,
  isRequired,
  variant,
  onClearField,
  textStyle,
  style,
  tooltipText,
}: Props) {
  const styles = useMultiStyleConfig('FormField', {
    variant,
  });

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <FormControl
      isInvalid={!!error}
      sx={styles.control}
      isRequired={isRequired}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ ...style }}
    >
      <HStack justifyContent="space-between">
        <HStack justifyContent="flex-start" marginBottom={0}>
          {label ? (
            <FormLabel sx={styles.label} style={{ ...textStyle }}>
              {label}
            </FormLabel>
          ) : null}
          {tooltipText?.length && (
            <FormLabel
              sx={styles.label}
              style={{ ...textStyle, marginBottom: '8px', marginLeft: '-7px' }}
            >
              <Tooltip placement="top" label={tooltipText}>
                {/* todo add icon */}
                icon
                {/* <TooltipIcon height={13} width={13} /> */}
              </Tooltip>
            </FormLabel>
          )}
        </HStack>
        {onClearField && isHovering && (
          <FormButton
            variant="ghost"
            onClick={onClearField}
            p={0}
            height="auto"
            backgroundColor="transparent"
            title="Clear"
          />
        )}
      </HStack>
      {children}
      <FormErrorMessage as={Text} variant="body" sx={styles.error}>
        {error}
      </FormErrorMessage>
    </FormControl>
  );
}
