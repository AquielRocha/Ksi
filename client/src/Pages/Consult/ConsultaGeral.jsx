import React, { useState, useEffect } from "react";
import axios from "axios";
import Background from "../../Components/Background/Background";
import Header from "../../Components/Header/Headers";

const ConsultaGeral = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("endereco");
  const [results, setResults] = useState([]);
  const [filterOn, setFilterOn] = useState(false);
  const [dataFiltered, setDataFiltered] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (filterOption === "endereco") {
          response = await axios.get(
            `http://localhost:3002/endereco?searchTerm=${searchTerm}`
          );
        } else {
          response = await axios.get(
            `http://localhost:3002/produto?searchTerm=${searchTerm}`
          );
        }
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchTerm, filterOption]);

  const renderResults = () => {
    return (
      <div className="results-container">
        <p>Resultados aqui</p>
        <ul className="results-list">
          {dataFiltered !== undefined && filterOn === true
            ? dataFiltered.map((result) => (
                <li key={result.id}>
                  <div className="result-item">
                    {filterOption === "endereco" ? (
                      <>
                        <span className="result-field">
                          <strong>Rua: </strong>
                          {result.rua}
                        </span>
                        <span className="result-field">
                          <strong>Prédio: </strong>
                          {result.predio}
                        </span>
                        <span className="result-field">
                          <strong>Andar: </strong>
                          {result.andar}
                        </span>
                        <span className="result-field">
                          <strong>Apartamento: </strong>
                          {result.apartamento}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="result-field">
                          <strong>Imagem: </strong>
                          <img
                            src={`http://localhost:3002/uploads/${result.imagem}`}
                            alt={result.nome}
                          />
                        </span>
                        <span className="result-field">
                          <strong>Nome: </strong>
                          {result.nome}
                        </span>
                        <span className="result-field">
                          <strong>Descrição: </strong>
                          {result.descricao}
                        </span>
                        <span className="result-field">
                          <strong>Local: </strong>
                          {result.local}
                        </span>
                      </>
                    )}
                  </div>
                </li>
              ))
            : results.map((result) => (
                <li key={result.id}>
                  <div className="result-item">
                    {filterOption === "endereco" ? (
                      <>
                        <span className="result-field">
                          <strong>Rua: </strong>
                          {result.rua}
                        </span>
                        <span className="result-field">
                          <strong>Prédio: </strong>
                          {result.predio}
                        </span>
                        <span className="result-field">
                          <strong>Andar: </strong>
                          {result.andar}
                        </span>
                        <span className="result-field">
                          <strong>Apartamento: </strong>
                          {result.apartamento}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="result-field">
                          <strong>Imagem: </strong>
                          <img
                            src={`http://localhost:3002/uploads/${result.imagem}`}
                            alt={result.nome}
                          />
                        </span>
                        <span className="result-field">
                          <strong>Nome: </strong>
                          {result.nome}
                        </span>
                        <span className="result-field">
                          <strong>Descrição: </strong>
                          {result.descricao}
                        </span>
                        <span className="result-field">
                          <strong>Local: </strong>
                          {result.local_id}
                        </span>
                      </>
                    )}
                  </div>
                </li>
              ))}
        </ul>
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilterOn(true);
    let filteredData;
    if (filterOption === "produto") {
      filteredData = results.filter(
        ({ nome }) => nome.toLowerCase() === searchTerm.toLowerCase()
      );
    } else if (filterOption === "endereco") {
      filteredData = results.filter(
        ({ predio }) => predio.toLowerCase() === searchTerm.toLowerCase()
      );
    }
    setDataFiltered(filteredData);
  };

  const handleFilterOptionChange = (e) => {
    e.preventDefault();
    setFilterOption(e.target.value);
    setFilterOn(false);
  };

  return (
    <div>
      <Header />
      <div className="search-container">
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
              Endereço
              <input
                type="radio"
                value="endereco"
                checked={filterOption === "endereco"}
                onChange={handleFilterOptionChange}
              />
            </label>
            <label>
              Produto
              <input
                type="radio"
                value="produto"
                checked={filterOption === "produto"}
                onChange={handleFilterOptionChange}
              />
            </label>
          </div>
        </div>
      </div>

      {renderResults()}
      <Background />
    </div>
  );
};

export default ConsultaGeral;
