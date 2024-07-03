import { Box } from '@chakra-ui/layout';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormEventHandler, ReactNode } from 'react';
import {
  FormProvider,
  useForm,
  UseFormProps,
  FieldValues,
} from 'react-hook-form';
import { AnyObject, ObjectSchema } from 'yup';

type Props<T extends FieldValues> = UseFormProps<T> & {
  onSubmit: (values: T) => void;
  children: ReactNode;
  validationSchema: ObjectSchema<any, AnyObject, any, any>;
};

export const FormWrapper = <T extends FieldValues>({
  onSubmit,
  children,
  validationSchema,
  defaultValues,
}: Props<T>) => {
  const formMethods = useForm<T>({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema) as any,
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
