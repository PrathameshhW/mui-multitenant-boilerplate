import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppForm from "../../components/Form/AppForm";
import { useForm } from "react-hook-form";
import { LoginLayout } from "../../clients";

const LoginPage = () => {
  const form = useForm({});

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  const handleFormSubmit = (data: any) => {
    console.log(data);
  };

  return <LoginLayout />;
};

export default LoginPage;
