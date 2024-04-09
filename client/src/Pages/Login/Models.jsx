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

  // Função para validar campos antes de enviar o formulário de login
  const handleCampo = (e) => {
    e.preventDefault();
    if (!userName.trim() || !password.trim()) {
      setError("Por favor, preencha todos os campos.");
      return;
    }
    // Se todos os campos estiverem preenchidos, limpe o erro
    setError("");
    // Em seguida, chame a função de login
    handleLogin(e);
  };

  return {
    userName,
    password,
    error,
    handleCampo,
    handleLogin,
    setUserName,
    setPassword,
    setError,
  };
};

export default LoginModels;
