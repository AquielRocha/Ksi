import React from 'react';
import { Link } from 'react-router-dom';
import './Dash.scss'; 
import Logo from '../../assets/bloco1.png';
import Lev from '../../assets/fundo.png';

const Dashboard = () => (

    <div className='main-container'>
        <h2>Endereçamento</h2>

        <div className='container-wrapper'>
            <div className='container'>
                <div className="square1-container">

                    <h4>Pesquisar</h4>    
                    <Link to='/consultag'>  <button className='btn'>Verificar</button> </Link>
                </div>
            </div>

            <div className='container'>
                <div className="square2-container">

                    <h4>Cadastrar</h4>
                  <Link to='/cadastrogeral'>  <button  className='btn' > Verificar</button> </Link>
                </div>
            </div>
        </div>

        <div className="bloc">
            <img src={Logo} alt="bolha" />
        </div>
        <div className="fundo">
            <img src={Lev} alt="fundo" />
        </div>
    </div>
);

export default Dashboard;
