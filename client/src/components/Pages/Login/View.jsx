import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';
import './login.scss';
import Background from '../../Background/Background';
import Header from '../../Header/Headers';
const LoginView = ({ userName, password, handleLogin, setUserName, setPassword, error }) => {
  
  
  
  return (

    <div className="body">
      <Link to={'/'}>
        <button>Página Principal</button>
      </Link>

      {error && <div className="alert">{error}</div>}

      <div className="conteiner">
        <Header />

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
      <Background />
    </div>
  );
};

export default LoginView;
