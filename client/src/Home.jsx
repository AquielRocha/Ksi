import React from 'react';
import { Link } from 'react-router-dom';
import logo from './Components/Assets/logo-princ.jpg';
import Cara from './Components/Assets/Heavy_box.gif';
import Header from './Components/Header/Headers';
import Background from './Components/Background/Background';

function Home() {
  return (
    <>

      
      <div className="container">
        <main>
          <Header />
          <img src={logo} alt="Logo" />
          <h1>Bem Vindo</h1>
          <div className="buttons">
            <Link to="/register"><button>Cadastro</button></Link>
            <Link to="/login"><button>Login</button></Link>
          </div>
        </main>
        <div className="images">
          <img src={Cara} alt="Pessoa" />
        </div>
        <Background />
      </div>
    </>
  );
}

export default Home;
