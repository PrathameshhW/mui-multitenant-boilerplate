import AppForm from "../../../components/Form/AppForm";
import FormItem from "../../../components/Form/FormItem";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@mui/material/Button";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginLayout = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLoginSubmit = (formValues: any) => {
    console.log(formValues);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-2xl font-semibold text-gray-800">Welcome Back</h1>
        <p className="text-sm text-gray-500 mt-1 mb-6">
          Please login to your account
        </p>

        <AppForm form={form} onSubmit={form.handleSubmit(handleLoginSubmit)}>
          <div className="space-y-4">
            <FormItem name="email">
              <TextField label="Email" type="email" fullWidth size="small" />
            </FormItem>

            <FormItem name="password">
              <TextField
                label="Password"
                type="password"
                fullWidth
                size="small"
              />
            </FormItem>

            <Button type="submit" variant="contained" fullWidth>
              Login
            </Button>
          </div>
        </AppForm>
      </div>
    </div>
  );
};

export default LoginLayout;
