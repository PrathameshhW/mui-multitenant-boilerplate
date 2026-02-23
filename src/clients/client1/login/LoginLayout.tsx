import AppForm from "../../../components/Form/AppForm";
import FormItem from "../../../components/Form/FormItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import type { LoginLayoutProps } from "../../../pages/login/types/login.dto";

const LoginLayout: React.FC<LoginLayoutProps> = (props) => {
  const { form, handleLoginSubmit, isSubmitting } = props;

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

            <Button type="submit" variant="contained" fullWidth disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </div>
        </AppForm>
      </div>
    </div>
  );
};

export default LoginLayout;
