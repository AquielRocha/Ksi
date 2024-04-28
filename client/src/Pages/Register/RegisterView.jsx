import React from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoMdMail } from "react-icons/io";
import Background from "../../Components/Background/Background";
import logo from "../../Components/Assets/logo-princ.jpg";
import imgprinc from "../../Components/Assets/Post.svg";

const RegisterView = ({
  handleCampo,
  handleRegister,
  userName,
  setUserName,
  email,
  setEmail,
  password,
  setPassword,
  error,
  setError,
  successMessage,
  setSuccessMessage,
}) => {
  return (
    <div>
      <div className="mover">
        <div className="register-form">
          <div className="reg">
            <img className="lo" src={logo} alt="Logo" />
            <h1>Register</h1>
          </div>
          <form onSubmit={handleRegister}>
            <div className="input-box">
              <IoMdMail className="icon" />
              <input
                type="email"
                placeholder="INSIRA O E-MAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-box">
              <FaUser className="icon" />
              <input
                type="text"
                placeholder="INSIRA O USUÁRIO"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="input-box">
              <RiLockPasswordLine className="icon" />
              <input
                type="password"
                placeholder="INSIRA A SENHA"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="bax">
              {error && <div className="alert">{error}</div>}
              {successMessage && (
                <div className="alert-s">{successMessage}</div>
              )}
              <button type="submit" onClick={handleCampo} className="btn-re">
                Register
              </button>

              <Link to="/login" style={{ textDecoration: "none" }}>
                <span className="sp">JÁ TENHO UMA CONTA</span>
              </Link>
            </div>
          </form>
        </div>
          <img id="img-principal" src={imgprinc} alt="imagem principal" />
      </div>
      <Background />
    </div>
  );
};

export default RegisterView;
