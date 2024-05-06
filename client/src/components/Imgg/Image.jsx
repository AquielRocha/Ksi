import React from "react";

const Imgg = ({ imagePath, size }) => {
  return (
    <img
      src={`http://localhost:3002/uploads/${imagePath}`}
      alt="Imagem"
      style={{ width: size, height: "auto", borderRadius: "100%" }}
    />
  );
};

export default Imgg;
