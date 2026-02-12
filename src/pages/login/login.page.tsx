import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginLayout } from "../../clients";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "./types/login.dto";

const LoginPage = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  const handleFormSubmit = (data: LoginFormValues) => {
    localStorage.setItem("token", data.email);
    navigate("/");
  };

  return <LoginLayout form={form} handleLoginSubmit={handleFormSubmit} />;
};

export default LoginPage;
