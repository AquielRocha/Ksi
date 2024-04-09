import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import Header from "../../Components/Header/Headers";

const ConsultProduct = ({ filterOption, setFilterOption }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [filterOn, setFilterOn] = useState(false);
  const [dataFiltered, setDataFiltered] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/produto?searchTerm=${searchTerm}`
        );
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchTerm, filterOption]);

  // Função para renderizar os resultados
  const renderResults = () => {
    return (
      <div className="results-container">
        <p>Resultados aqui</p>
        <ul className="results-list">
          {dataFiltered !== undefined && filterOn == true
            ? dataFiltered.map((result) => (
                <li key={result.id}>
                  <div className="result-item">
                    {Object.entries(result).map(([key, value]) => (
                      <span key={key} className="result-field">
                        <strong>{key}: </strong>
                        {value}
                      </span>
                    ))}
                  </div>
                </li>
              ))
            : results.map((result) => (
                <li key={result.id}>
                  <div className="result-item">
                    {Object.entries(result).map(([key, value]) => (
                      <span key={key} className="result-field">
                        <strong>{key}: </strong>
                        {value}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
        </ul>
      </div>
    );
  };

  // Lógica para lidar com a submissão do formulário de pesquisa]
  const handleSubmit = (e) => {
    e.preventDefault();
    setFilterOn(true);
    if (filterOption == "produto") {
      setDataFiltered(
        results.filter(({ nome }) => {
          return nome.toLowerCase() == searchTerm.toLowerCase();
        })
      );
    }
    if (filterOption == "endereco") {
      setDataFiltered(
        results.filter(({ predio }) => {
          return predio.toLowerCase() == searchTerm.toLowerCase();
        })
      );
    }
  };

  const OptionFilter = (e) => {
    e.preventDefault();
    setFilterOption(e.target.value);
    setFilterOn(false);
  };

  return (
    <div>
      <Header />
      <div className="search-container">
        <BsSearch />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Pesquisar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
         />
          <button type="submit" className="search-button">
            Pesquisar
          </button>
        </form>
        <div className="filter-container">
          <h2>Filtrar por</h2>
          <div>
            <label>
              Produto
              <input
                type="radio"
                value="produto"
                checked={filterOption === "produto"}
                onChange={(e) => OptionFilter(e)}
              />
            </label>
          </div>
        </div>
      </div>
      {renderResults()}
    </div>
  );
};

export default ConsultProduct;