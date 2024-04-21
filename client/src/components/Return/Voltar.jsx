import React from 'react';
import { IoIosReturnLeft } from 'react-icons/io';
import './voltar.css'; // Importe o arquivo CSS para estilização, se necessário
import { Link } from 'react-router-dom';

const Voltar = () => {



  return (
    <div className="return" >
      <Link to="/dashboard">
      <button className='bution'>
        <IoIosReturnLeft className="iconn" />
      </button>
      </Link>
    </div>
  );

};
export default Voltar;
