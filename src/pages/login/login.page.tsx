import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppForm from "../../components/Form/AppForm";
import { useForm } from "react-hook-form";

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

  return (
    <div>
      <AppForm form={form} onSubmit={form.handleSubmit(handleFormSubmit)}>
        <h1>Login Form</h1>
      </AppForm>
    </div>
  );
};

export default LoginPage;
