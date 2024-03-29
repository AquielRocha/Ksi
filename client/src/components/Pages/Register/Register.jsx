import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';
import { IoMdMail } from 'react-icons/io';
import axios from 'axios';
import '../Login/login.scss';
import Background from '../../Background/Background';

//variaveis a ser usadas para essa função
const Register = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  // operação para enviar dados para o banco de dados
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/usuario', {
        nome: userName,
        email,
        senha: password,
      });
      console.log(response.data);
      // Exibir mensagem de sucesso apos se cadastrar
      setSuccessMessage('Cadastro realizado com sucesso');
      // Limpar o formulário apos se cadastrar
      setUserName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      setError('Erro ao se cadastrar. Por favor, tente novamente mais tarde.');
    }
  };

  return (
    <div>
      <Link to={'/'}>
        <button>Página Principal</button>
      </Link>

      <div className="conteiner">
        <div className="login-form">
          <h1 className="hlo">Register</h1>
          <form onSubmit={handleRegister}>
            <div className="input-box">
              <label htmlFor="">Insira seu E-mail</label>
              <IoMdMail className="icon" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-box">
              <label htmlFor="">Insira seu Usuário</label>
              <FaUser className="icon" />
              <input
                type="text"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="input-box">
              <label htmlFor="">Senha</label>
              <RiLockPasswordLine className="icon" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <div className="error">{error}</div>}
            {successMessage && <div className="success">{successMessage}</div>}
            <button type="submit" className="btn-re">
              Register
            </button>
          </form>
        </div>
      </div>
      <Background />
    </div>
  );
};

export default Register;
