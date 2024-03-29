// TypingsPage.jsx
import React from "react";
import { Route } from "react-router-dom"; // Importe o componente Route do React Router

// Definição de tipos específicos
export const SetPage = ({ page }) => {
  return <div>{page}</div>;
};

export const SetText = ({ text }) => {
  return <input type="text" value={text} />;
};

// Página para exportar definições de tipos e rotas
const TypingsPage = () => {
  return (
    <div>
      <h1>Typings Page</h1>
      {/* Rotas para outras páginas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/produto" element={<CadastroProduto />} />
      <Route path="/endereco" element={<CadastroEndereco />} />
      <Route path="/cadastrogeral" element={<CadastroGeral />} />
      <Route path="/local" element={<CadastroLocal />}/>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/consultaG" element={<ConsultaGeral/>} />
      <Route path="/consultaE" element={<ConsultaEndereco/>} />
      <Route path="/consultaP" element={<ConsultarProduto/>} />
    </div>
  );
};

export default TypingsPage;
