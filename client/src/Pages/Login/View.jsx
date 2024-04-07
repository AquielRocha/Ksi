import React from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import logo from "../../Components/Assets/logo-princ.jpg";
import Background2 from "../../Components/Background-Inicial/background2";

const LoginView = ({
  userName,
  password,
  handleLogin,
  setUserName,
  setPassword,
  setError,
  error,
}) => {
  return (
    <div>
      <div className="mover">
        <div className="login-form">
          <div className="cont2">
            <img className="seg-img" src={logo} alt="Logo" />

            <h1 className="hlo">LOG IN</h1>
          </div>


          <form onSubmit={handleLogin}>
            <div className="input-box">
              <FaUser className="icon" />
              <input
                type="text"
                placeholder="INSIRA SEU USUÁRIO"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="input-box">
              <RiLockPasswordLine className="icon" />
              <input
                type="password"
                placeholder="INSIRA A SENHA "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="vtar">
              <button type="submit" className="btn-go">
                LOGAR
              </button>
              <Link to="/register" style={{ textDecoration: "none" }}>
              {error && <div className="alert">{error}</div>}

                <span className="spaa">NÃO TENHO CONTA</span>
              </Link>
              
            </div>
          </form>
        </div>
      </div>

      <Background2 />
    </div>
  );
};

export default LoginView;
