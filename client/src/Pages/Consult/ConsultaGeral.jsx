import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../Components/Header/Headers";
import Imgg from "../../Components/Imgg/Image";
import Background from "../../Components/Background/Background";
import { VscSearch } from "react-icons/vsc";
import ReactLoading from "react-loading";

const ConsultaGeral = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("endereco");
  const [results, setResults] = useState([]);
  const [filterOn, setFilterOn] = useState(false);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm, filterOption]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilterOn(true);
    if (filterOption === "produto") {
      setDataFiltered(
        results.filter(({ nome }) => {
          return nome.toLowerCase() === searchTerm.toLowerCase();
        })
      );
    }
    if (filterOption === "endereco") {
      setDataFiltered(
        results.filter(({ predio }) => {
          return predio.toLowerCase() === searchTerm.toLowerCase();
        })
      );
    }
  };

  const OptionFilter = (e) => {
    e.preventDefault();
    setFilterOption(e.target.value);
    setFilterOn(false);
  };

  const Results = () => {
    return (
      <div className="results-container">
        {loading && <ReactLoading type={"spin"} color={"#000"} />} {/* Spinner de carregamento */}
        {!loading && (
          <>
            <p>Resultados aqui</p>
            <div className="results-list">
              {dataFiltered !== undefined && filterOn === true
                ? dataFiltered.map((result) => (
                    <li key={result.id}>
                      <div className="result-item">
                        {filterOption === "produto" && (
                          <Imgg imagePath={result.imagem} size="30px" />
                        )}
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
                        {filterOption === "produto" && (
                          <div className="sim">
                            <Imgg imagePath={result.imagem} size="30px" />
                          </div>
                        )}
                        {Object.entries(result).map(([key, value]) => (
                          <span key={key} className="result-field">
                            <strong>{key}: </strong>
                            {value}
                          </span>
                        ))}
                      </div>
                    </li>
                  ))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="center">
        <Header />
      </div>

      <Background />
      <div className="conteiner-first">
        <form className="heads" onSubmit={handleSubmit}>
          <div className="filtro-container">
            <h2>FILTRAR POR</h2>

            <div className="opcoes">
              <label>
                ENDEREÇO
                <input
                  type="radio"
                  value="endereco"
                  checked={filterOption === "endereco"}
                  onChange={OptionFilter}
                />
              </label>
              <label>
                PRODUTO
                <input
                  type="radio"
                  value="produto"
                  checked={filterOption === "produto"}
                  onChange={OptionFilter}
                />
              </label>
            </div>

            <input
              type="text"
              placeholder="PESQUISE AQUI "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
              <div className="icon">
                <VscSearch />
              </div>
            </button>
          </div>
        </form>
      </div>
      <div className="consultas">{Results()}</div>
    </div>
  );
};

export default ConsultaGeral;
