import React from "react";
import { Link } from "react-router-dom";
import "./Dash.scss";
import Lev from "../../assets/fundo.png";
import Login from "../../assets/Login.svg";
import Product from "../../assets/product.svg";
import End from '../../assets/ende.jpg';



const Dashboard = () => (
  <div className="main-container">
     <header>
        <img src={End} alt="Header" />
      </header>

    <div className="container-wrapper">

    {/* primeiro bloco */}

      <div className="container">
        <div className="square1-container">
          <h4  >Pesquisar</h4>

          <div className="Product">
            <img className="img-product" src={Product} alt="Product" />
          </div>

          <Link to="/consultag">
            <button className="btn">VERIFICAR</button>
          </Link>
        </div>
      </div>

    {/* segundo bloco */}

      <div className="container">
        <div className="square2-container">
          <h4>Cadastrar</h4>
          <div className="Login">
            <img className="img-product" src={Login} alt="Login" />
          </div>

          <Link to="/cadastrogeral">
            <button className="btn"> VERIFICAR</button>
          </Link>
        </div>
      </div>
    </div>

    {/* plano de fundo */}

    <div className="fundo">
      <img src={Lev} alt="fundo" />
    </div>
  </div>
);

export default Dashboard;
