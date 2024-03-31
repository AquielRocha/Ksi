import React from 'react';
import End from './head.jpg';
import './hd.css';
const Header = () => {
  return (
    <header>
      <img src={End} alt="Header" style={{ width: '250px', height: '60px' }} /> 
    </header>
  );
};

export default Header;
