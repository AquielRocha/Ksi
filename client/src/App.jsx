import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import CadastroProduto from "./Pages/Product/CadastroProduto";
import CadastroEndereco from "./Pages/Adress/CadastroEndereco";
import CadastroLocal from "./Pages/Locale/CadastroLocal";
import ConsultaGeral from "./Pages/GeneralRegistration/ConsultaGeral";
import ConsultaEndereco from "./Pages/Adress/ConsultaEndereco";
import ConsultarProduto from "./Pages/Product/ConsultaProduto";
import CadastroGeral from "./Pages/GeneralRegistration/CadastroGeral";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/produto" element={<CadastroProduto />} />
        <Route path="/endereco" element={<CadastroEndereco />} />
        <Route path="/cadastrogeral" element={<CadastroGeral />} />
        <Route path="/local" element={<CadastroLocal />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/consultaG" element={<ConsultaGeral />} />
        <Route path="/consultaE" element={<ConsultaEndereco />} />
        <Route path="/consultaP" element={<ConsultarProduto />} />
      </Routes>
    </Router>
  );
}

export default App;
