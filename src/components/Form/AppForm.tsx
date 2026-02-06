import React from "react";
import { FormProvider } from "react-hook-form";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  form: any;
  children: React.ReactNode;
}

const AppForm = ({ form, children, ...props }: FormProps) => {
  return (
    <FormProvider {...form}>
      <form {...props}>{children}</form>
    </FormProvider>
  );
};

export default AppForm;
