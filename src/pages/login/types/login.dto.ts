import { z } from "zod";
import type { UseFormReturn } from "react-hook-form";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export interface LoginLayoutProps {
  form: UseFormReturn<LoginFormValues>;
  handleLoginSubmit: (data: LoginFormValues) => void | Promise<void>;
  isSubmitting?: boolean;
}
