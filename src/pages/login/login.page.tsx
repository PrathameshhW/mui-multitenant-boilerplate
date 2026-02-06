import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ButtonUsage from "../../components/ButtonUsage";

const LoginPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <ButtonUsage />
    </div>
  );
};

export default LoginPage;
