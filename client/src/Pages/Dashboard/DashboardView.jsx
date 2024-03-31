import React from "react";
import { Link } from "react-router-dom";
import Login from "../../Components/Assets/Login.svg";
import Product from "../../Components/Assets/Product.svg";

const DashboardView = () => (
  <div className="container-wrapper">
    {/* primeiro bloco */}
    <div className="container">
      <div className="square1-container">
        <h4>Pesquisar</h4>

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
);

export default DashboardView;
