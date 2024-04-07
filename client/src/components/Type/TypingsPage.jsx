// TypingsPage.jsx
import React from "react";
import { Route } from "react-router-dom"; // Importe o componente Route do React Router
import PrivateRoute from "./PrivateRoute";


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
      <PrivateRoute path="/produto" element={<CadastroProduto />} />
<PrivateRoute path="/endereco" element={<CadastroEndereco />} />
<PrivateRoute path="/cadastrogeral" element={<CadastroGeral />} />
<PrivateRoute path="/local" element={<CadastroLocal />}/>
<PrivateRoute path="/dashboard" element={<Dashboard />} />
<PrivateRoute path="/consultaG" element={<ConsultaGeral/>} />
<PrivateRoute path="/consultaE" element={<ConsultaEndereco/>} />
<PrivateRoute path="/consultaP" element={<ConsultarProduto/>} />
    </div>
  );
};

export default TypingsPage;
