import React, { type ReactElement } from "react";
import { Controller, type FieldPath, type FieldValues, useFormContext } from "react-hook-form";

type ControlledInputProps = {
  name?: string;
  value?: unknown;
  onChange?: (...event: unknown[]) => void;
  onBlur?: () => void;
  error?: boolean;
  helperText?: string;
};

interface FormItemProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> {
  name: TName;
  children: ReactElement<ControlledInputProps>;
}

const FormItem = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  name,
  children,
}: FormItemProps<TFieldValues, TName>) => {
  const { control } = useFormContext<TFieldValues>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) =>
        React.cloneElement(children, {
          ...field,
          error: Boolean(fieldState.error),
          helperText: fieldState.error?.message,
        })
      }
    />
  );
};

export default FormItem;
