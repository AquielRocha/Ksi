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
import Modal from "../../Components/Modal/modal";

const ConsultaGeral = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("endereco");
  const [results, setResults] = useState([]);
  const [filterOn, setFilterOn] = useState(false);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Estado para controlar o item selecionado
  const [modalOpen, setModalOpen] = useState(false); // Estado para controlar a abertura do modal

  // Manipulador de evento para abrir o modal e definir o item selecionado
  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  // Manipulador de evento para fechar o modal
  const handleCloseModal = () => {
    setSelectedItem(null);
    setModalOpen(false);
  };

  function getItemDetails() {
    if (selectedItem && "nome" in selectedItem) {
      // Selected item is a product
      return (
        <>
          <h2>Detalhes do Produto</h2>
          <Imgg imagePath={result.imagem} size="30px" />

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
          <p>Nome: {selectedItem.nome}</p>
          <p>Descrição: {selectedItem.descricao}</p>
          <p>Local: {selectedItem.local_id}</p>
          {/* Add more product details as necessary */}
        </>
      );
    } else if (selectedItem && "predio" in selectedItem) {
      // Selected item is an address
      return (
        <>
          <h2>Detalhes do Endereço</h2>
          <p>
            Endereço: {selectedItem.predio}, {selectedItem.rua},{" "}
            {selectedItem.numero}
          </p>
        </>
      );
    } else {
      return <p>Selecione um produto ou endereço válido.</p>;
    }
  }

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
  const renderModal = () => {
    if (modalOpen && selectedItem) {
      return (
        <Modal onClose={handleCloseModal}>
          <h2>Detalhes do Item</h2>
          <p>Nome: {selectedItem.nome}</p>
        </Modal>
      );
    }
    return null;
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
                  <h2>Resultados de Endereços:</h2>{" "}
                  {/* Subtítulo para endereços */}
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
                        <button onClick={() => handleOpenModal(result)}>
                          Visualizar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <h2>Resultados de Produtos:</h2>{" "}
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
                        <button onClick={() => handleOpenModal(result)}>
                          Visualizar Detalhes
                        </button>
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
        <div className="consulta-container"></div>
        {Results()}
      </div>
      {/* Renderize o modal */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        getItemDetails={getItemDetails}
      />
      {modalOpen && getItemDetails()}
    </div>
  );
};

export default ConsultaGeral;
