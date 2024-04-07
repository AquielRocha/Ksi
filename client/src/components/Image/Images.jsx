import React from "react";
import Axios from "axios";
import "./Image.css";

const Images = ({ setImagem }) => {
  const handleImagemChange = async (e) => {
    const imagem = e.target.files[0];
    setImagem(imagem); // Define a imagem no estado do componente Produto
  };

  return (
    <div className="iml">
      <label htmlFor="imagem">Imagem do Produto:</label>
      <input type="file" onChange={handleImagemChange} />
    </div>
  );
};

export default Images;