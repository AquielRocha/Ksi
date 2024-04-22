import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../Components/Header/Headers";
import Imgg from "../../Components/Imgg/Image";
import Background from "../../Components/Background/Background";
import { VscSearch } from "react-icons/vsc";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import { IoIosReturnLeft } from "react-icons/io";
import Voltar from "../../Components/Return/Voltar";

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
      {loading && <ReactLoading type={"spin"} color={"#000"} />}{" "}
      {/* Spinner de carregamento */}
      {!loading && (
        <>
          {dataFiltered.length === 0 && filterOn && (
            <p>Nenhum resultado foi encontrado.</p>
          )}
          <div className="results-list">
            {dataFiltered !== undefined && filterOn === true ? (
              <div>
                <h2>Resultados de Endereços:</h2> {/* Subtítulo para endereços */}
                {dataFiltered.map((result) => (
                  <div unic className="unico" key={result.id}>
                    <div className="result-item">
                      {filterOption === "produto" && (
                        <Imgg imagePath={result.imagem} size="30px" />
                      )}
                      {Object.entries(result).map(([key, value]) => {
                        if (key !== "imagem") {
                          return (
                            <span key={key} className="result-field">
                              {value}
                            </span>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <h2>Resultados de Produtos:</h2> {/* Subtítulo para produtos */}
                {results.map((result) => (
                  <div unic className="unico" key={result.id}>
                    <div className="result-item">
                      {filterOption === "produto" && (
                        <Imgg imagePath={result.imagem} size="30px" />
                      )}
                      {Object.entries(result).map(
                        ([key, value]) =>
                          key !== "imagem" && (
                            <span key={key} className="result-field">
                              {value}
                            </span>
                          )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
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

      <Voltar />
      <Background />
      <div className="conteiner-first">
        <form className="heads" onSubmit={handleSubmit}>
          <div className="filtro-container">
            <div className="opcoes">
              <h2>FILTRAR POR:</h2>
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
              <VscSearch className="icon" />
            </button>
          </div>
        </form>
      </div>
      <div className="consultas">
        
        <div className="consulta-container">
          
        </div>
        {Results()}
      </div>
    </div>
  );
};

export default ConsultaGeral;
