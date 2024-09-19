import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../components/assets/logo-princ.jpg';
import Cara from '../../components/assets/Heavy_box.gif';
import Header from '../../components/Header/Headers';
import Background2 from '.c/../components/Background-Inicial/background2';



fcnction Home() {
  return (
    <>

      <Header />
      <div className="container-s">
        <main>
          <div className="passo-1">
            <img className='seg-img' src={logo} alt="Logo" />           
            <h1>Bem Vindo</h1>
          </div>
          <div className="buttons">
            <Link  to="/register">
                <button className="button-init" >
                  Cadastro
                </button>
              </Link>
            <span >OU</span>
            <Link to="/login">
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
