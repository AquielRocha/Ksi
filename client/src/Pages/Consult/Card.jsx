import React from 'react';
import Background from '../../Components/Background/Background'
import Header from '../../Components/Header/Headers';


const Card = ({ image, productName, description, sector }) => {
  return (
    <div className="container-wrapper">
      <Header />
      <div className="container">
        <div className="square1-container">
          <div className="img-container">
            <img src={image} alt="Product" className="img-product" />
          </div>
          <div className="Product">
            <h4>{productName}</h4>
            <p>{description}</p>
            <p>Produto: {productName}</p>
            <p>Descrição: {description}</p>
            <p>Setor: {sector}</p>
           
          </div>
          <div className="button-container">
              <button className="btn-send">Enviar</button>
            </div>
            <div className="button-cont">
              <button className="btn-edit">Cancelar</button>
  </div>
        </div>
      </div>
      <Background />
    </div>
  );
};

export default Card;
