import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';
import axios from 'axios';
import './login.scss';

//variaveis do banco de dados

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  //A função handleLogin é uma função assíncrona que lida com o evento de submissão de um formulário de login.
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/login', { userName, password });
      console.log(response.data);
      if (response.data.error) { // Verifica se há um erro na resposta
        setError('Usuário ou senha incorretos');
      } else {
        // Se não houver erro, redirecione para /cadastrogeral
        window.location.href = '/cadastrogeral';
      }
    } catch (error) {
      if (error.response.status === 401) {
        setError('Usuário ou senha incorretos');
      } else {
        console.error(error);
        setError('Ocorreu um erro ao fazer login');
      }
    }
  };
  
  
  

  return (
    <div className="body">
      <Link to={'/'}>
        <button>Página Principal</button>
      </Link>

      {error && <div className="alert">{error}</div>}

      <div className="conteiner">
        <div className="login-form">
          <h1 className="hlo">Log in</h1>
          <form onSubmit={handleLogin}>
            <div className="input-box">
              <label htmlFor="">Insira seu Usuário</label>
              <FaUser className="icon" />
              <input
                type="text"
                placeholder="Usuário"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="input-box">
              <label htmlFor="">Senha</label>
              <RiLockPasswordLine className="icon" />
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Link to="/">
              <span className="spaa">Esqueceu a senha?</span>
            </Link>
            <br />
            <button type="submit" className="btn-go">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
