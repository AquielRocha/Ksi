import React from 'react';
import './Background.css';
import Back from './fundo.png';

const Background = () => {
  return (
    <div className="background">
      <img src={Back} alt="Fundo" />
    </div>
  );
};

export default Background;
