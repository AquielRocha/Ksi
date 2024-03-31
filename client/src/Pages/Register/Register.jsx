import React, { useState } from "react";
import axios from "axios";
import RegisterView from "./RegisterView";


const Register = () => {
  // Estado para controlar o nome de usuário
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Função para enviar dados para o servidor
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3002/usuario", {
        nome: userName,
        email,
        senha: password,
      });
      console.log(response.data);
      setSuccessMessage("Cadastro realizado com sucesso");
      setUserName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setError("Erro ao se cadastrar. Por favor, tente novamente mais tarde.");
    }
  };

  return (
    <RegisterView
      handleRegister={handleRegister}
      userName={userName}
      setUserName={setUserName}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      error={error}
      setError={setError}
      successMessage={successMessage}
      setSuccessMessage={setSuccessMessage}
    />
  );
};

export default Register;