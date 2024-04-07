import React, { useState } from "react";
import axios from "axios";

const LoginModels = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3002/login", {
        userName,
        password,
      });
      console.log(response.data);
      if (response.data.error) {
        setError("USUÁRIO OU SENHA INCORRETOS");
      } else {
        window.location.href = "/dashboard";
      }
    } catch (error) {
      if (error.response.status === 401) {
        setError("USUÁRIO OU SENHA INCORRETOS");
      } else {
        console.error(error);
        setError("Ocorreu um erro ao fazer login");
      }
    }
  };

  return {
    userName,
    password,
    error,
    handleLogin,
    setUserName,
    setPassword,
    setError,
  };
};

export default LoginModels;
