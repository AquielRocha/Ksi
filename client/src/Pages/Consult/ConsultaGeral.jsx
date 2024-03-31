import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Background from '../../Components/Background/Background';
import { BsSearch } from "react-icons/bs";
import Header from '../../Components/Header/Headers';


const ConsultaGeral = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('endereco'); // Opções: endereco, produto

  // Função para renderizar os resultados
  const renderResults = () => {
    return (
      <div>
        <p>Resultados aqui</p>
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para lidar com a submissão do formulário de pesquisa
  };

  return (
    <div>
      <Header />
      <div className="frot">
        <BsSearch />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Pesquisar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className='oii'>Pesquisar</button>
        </form>
        <div>
          <h2>Filtrar por</h2>
          <div>
            <label>
              Endereço
              <input
                type="radio"
                value="endereco"
                checked={filterOption === 'endereco'}
                onChange={() => setFilterOption('endereco')}
              />
            </label>
            <label>
              Produto
              <input
                type="radio"
                value="produto"
                checked={filterOption === 'produto'}
                onChange={() => setFilterOption('produto')}
              />
            </label>
          </div>
        </div>
      </div>
      {renderResults()}
      <Link to="/detalhes">Visualizar</Link> {/* Link para a página de detalhes */}
      <Background />
   
   
   
    </div>
  );
};

export default ConsultaGeral;