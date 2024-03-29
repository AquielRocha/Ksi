import React from 'react';
import End from './head.jpg';
import './hd.css';
const Header = () => {
  return (
    <header>
      <img src={End} alt="Header" style={{ width: '306px', height: '84px' }} /> 
    </header>
  );
};

export default Header;
