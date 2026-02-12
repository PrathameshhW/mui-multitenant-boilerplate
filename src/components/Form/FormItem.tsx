import React, { type ReactElement } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface FormItemProps<T extends ReactElement> {
  name: string;
  children: T;
}

const FormItem = <T extends ReactElement>({
  name,
  children,
}: FormItemProps<T>) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return React.cloneElement(children, {
          ...field,
          error: !!fieldState.error,
          helperText: fieldState.error?.message,
        } as any);
      }}
    />
  );
};

export default FormItem;
