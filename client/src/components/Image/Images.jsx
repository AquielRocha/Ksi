import React from 'react';
import Axios from 'axios';

const Images = ({ setImagem }) => {
  const handleImagemChange = async (e) => {
    const imagem = e.target.files[0];
    setImagem(imagem); // Define a imagem no estado do componente Produto
  };

  return (
    <div>
      <input type="file" onChange={handleImagemChange} />
    </div>
  );
};

export default Images;