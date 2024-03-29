import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Dashboard from './Components/Pages/Dashboard/Dashboard';
import Login from './Components/Pages/Login/Login';
import Register from './Components/Pages/Register/Register';
import CadastroProduto from './Components/Pages/Cadaster/CadastroProduto';
import CadastroEndereco from './Components/Pages/Cadaster/CadastroEndereco';
import CadastroLocal from './Components/Pages/Cadaster/CadastroLocal';
import ConsultaGeral from './Components/Pages/Consult/ConsultaGeral';
import ConsultaEndereco from './Components/Pages/Consult/ConsultaEndereco';
import ConsultarProduto from './Components/Pages/Consult/ConsultaProduto';
import CadastroGeral from './Components/Pages/GeneralRegistration/CadastroGeral';



function App() {
  return (
    <Router>
      <Routes>
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

      </Routes>
    </Router>
  );
}

export default App;
