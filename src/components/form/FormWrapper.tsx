import { Box } from '@chakra-ui/layout';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormEventHandler, ReactNode } from 'react';
import { FormProvider, useForm, UseFormProps } from 'react-hook-form';
import { AnySchema, ObjectSchema } from 'yup';

type Props<T> = UseFormProps<T> & {
  onSubmit: (values: T) => void;
  children: ReactNode;
  validationSchema: ObjectSchema<Record<keyof T, AnySchema>>;
};

export const FormWrapper = <T,>({
  onSubmit,
  children,
  validationSchema,
  defaultValues,
}: Props<T>) => {
  const formMethods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit } = formMethods;

  const onSubmitWrapper: FormEventHandler<HTMLDivElement> &
    FormEventHandler<HTMLFormElement> = (e) => {
    e?.stopPropagation();
    e?.preventDefault();
    handleSubmit(onSubmit)();
  };

  return (
    <FormProvider {...formMethods}>
      <Box h="full" as="form" onSubmit={onSubmitWrapper}>
        {children}
      </Box>
    </FormProvider>
  );
};
