import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Background from '../../Components/Background/Background';
import { BsSearch } from "react-icons/bs";
import Header from '../../Components/Header/Headers';

const ConsultaGeral = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('endereco'); // Opções: endereco, produto
  const [results, setResults] = useState([]); // Corrigido para inicializar com array vazio []

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (filterOption === 'endereco') {
          response = await axios.get(`http://localhost:3002/endereco?searchTerm=${searchTerm}`);
        } else {
          response = await axios.get(`http://localhost:3002/produto?searchTerm=${searchTerm}`);
        }
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchTerm, filterOption]);

  // Função para renderizar os resultados
  const renderResults = () => {
    return (
      <div>
        <p>Resultados aqui</p>
        <ul>
          {results.map(result => (
            <li key={result.id}>
              {Object.entries(result).map(([key, value]) => (
                <span key={key}>
                  <strong>{key}: </strong>
                  {value}
                </span>
              ))}
            </li>
          ))}
        </ul>
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
      <Link to="/card">Visualizar</Link> {/* Link para a página de detalhes */}
      <Background />
    </div>
  );
};

export default ConsultaGeral;
