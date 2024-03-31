import React from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoMdMail } from "react-icons/io";
import Background from "../../Components/Background/Background";
import Header from "../../Components/Header/Headers";

const RegisterView = ({
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
      <Header />
      <Link to={"/"}>
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

export default RegisterView;