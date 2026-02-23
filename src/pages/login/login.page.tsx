import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginLayout } from "../../clients";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "./types/login.dto";
import { loginUser } from "./login.api";

const LoginPage = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const { mutateAsync: loginMutation, isPending } = useMutation({
    mutationFn: loginUser,
  });

  const handleFormSubmit = async (data: LoginFormValues) => {
    try {
      const response = await loginMutation(data);
      localStorage.setItem("token", response.token);
      navigate("/");
    } catch {
      // Error toast is handled globally by TanStack Query onError callbacks.
    }
  };

  return (
    <LoginLayout
      form={form}
      handleLoginSubmit={handleFormSubmit}
      isSubmitting={isPending}
    />
  );
};

export default LoginPage;
