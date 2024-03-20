import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/page/PaginasSeleção/Home'
import Login from './components/page/Login/Login';
import Register from './components/page/Register/Register';
import CadastroProduto from './components/page/Crud/CadastroProduto';
import CadastroEndereco from './components/page/Crud/CadastroEndereco';
import CadastroLocal from './components/page/Crud/CadastroLocal';
import CadastroGeral from './components/page/PaginasSeleção/CadastroGeraL';
import Dashboard from './components/page/PaginasSeleção/Dashboard';
import ConsultaGeral from './components/page/Crud/ConsultaGeral';
import ConsultaEndereco from './components/page/Crud/ConsultaEndereco';
import ConsultarProduto from './components/page/Crud/ConsultaProduto';
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
