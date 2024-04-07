import React from 'react';
import End from './head.jpg';
import './hd.css';
const Header = () => {
  return (
    <header>
      <img src={End} alt="Header" style={{ width: '280px', height: '70px' }} /> 
    </header>
  );
};

export default Header;
