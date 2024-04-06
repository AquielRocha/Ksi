import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Background from "../../Components/Background/Background";
import { BsSearch } from "react-icons/bs";
import Header from "../../Components/Header/Headers";

const ConsultaGeral = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("endereco"); // Opções: endereco, produto
  const [results, setResults] = useState([]); // estado para inicializar com array vazio []
  const [filterOn, setFilterOn] = useState(false); // Inicializar Filtro
  const [dataFiltered, setDataFiltered] = useState([]); // results Filtrado

//const [showConsult, setShowConsut] = useState(true); // Novo estado para controlar a exibição dos card/
//const [showConsultProduto, setShowConsultProduto] = useState(false);
  // [showConsultEndereco, setShowConsultEndereco] = useState(false);


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
    console.log(filterOption);
    setFilterOn(true);
    console.log(results);
    if (filterOption == "produto") {
      console.log(filterOption);
      setDataFiltered(
        results.filter(({ nome }) => {
          return nome.toLowerCase() == searchTerm.toLowerCase();
        })
      );
    }
    if (filterOption == "endereco") {
      console.log(filterOption);
      setDataFiltered(
        results.filter(({ predio }) => {
          return predio.toLowerCase() == searchTerm.toLowerCase();
        })
      );
    }
    console.log(dataFiltered);
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
              Endereço
              <input
                type="radio"
                value="endereco"
                checked={filterOption === "endereco"}
                onChange={(e) => OptionFilter(e)}
              />
            </label>
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

    {/*  <button
            className="btn-log"
            onClick={() => {
              fecharAbasCadastro();
              setShowConsultProduto(true);
              setShowConsult(false);

              <Link to="/card">Visualizar</Link> {/* Link para a página de detalhes */}

            }}

      <Background />
          </div>


          
  );
};

export default ConsultaGeral;
