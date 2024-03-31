import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../Components/Assets/logo-princ.jpg';
import Cara from '../../Components/Assets/Heavy_box.gif';
import Header from '../../Components/Header/Headers';
import Background2 from '../../Components/Background-Inicial/background2';



function Home() {
  return (
    <>

      <Header />
      <div className="container">
        <main>
          <div className="passo-1">
            <img className='seg-img' src={logo} alt="Logo" />           
            <h1>Bem Vindo</h1>
          </div>
          <div className="buttons">
            <Link className="button-register" to="/register">
                <button className="button-init" >
                  Cadastro
                </button>
              </Link>
            <span>OU</span>
            <Link className="button-login" to="/login">
                <button className="button-init" >
                  Login
                </button>
            </Link>
          </div>
        </main>
        <div>
          <img className="images" src={Cara} alt="Pessoa" />
        </div>
        <Background2 />
      </div>
    </>
  );
}

export default Home;
