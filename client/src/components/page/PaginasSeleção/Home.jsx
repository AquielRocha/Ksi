import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';
import logo from '../../assets/logo-princ.jpg';
import End from '../../assets/ende.jpg';
import Cara from '../../assets/Heavy_box.gif';
import Bloco from '../../assets/bloco1.png';

function Home() {
  return (
    <>
      <header>
        <img src={End} alt="Endereço" />
      </header>
      
      <div className="container">
        <main>
          <img src={logo} alt="Logo" />
          <h1>Bem Vindo</h1>
          <div className="buttons">
            <Link to="/register"><button>Cadastro</button></Link>
            <Link to="/login"><button>Login</button></Link>
          </div>
        </main>
        <div className="images">
          <img src={Cara} alt="Pessoa" />
          <img src={Bloco} alt="Bloco" />
        </div>
      </div>
    </>
  );
}

export default Home;
