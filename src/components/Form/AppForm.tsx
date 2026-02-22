import type { FormHTMLAttributes, ReactNode } from "react";
import { FormProvider, type FieldValues, type UseFormReturn } from "react-hook-form";

interface AppFormProps<
  TFieldValues extends FieldValues,
> extends FormHTMLAttributes<HTMLFormElement> {
  form: UseFormReturn<TFieldValues>;
  children: ReactNode;
}

const AppForm = <TFieldValues extends FieldValues>({
  form,
  children,
  ...props
}: AppFormProps<TFieldValues>) => {
  return (
    <FormProvider {...form}>
      <form {...props}>{children}</form>
    </FormProvider>
  );
};

export default AppForm;
