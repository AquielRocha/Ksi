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

  // Estados para armazenar os novos valores dos campos editáveis
  const [novoNome, setNovoNome] = useState("");
  const [novoCodigoBarras, setNovoCodigoBarras] = useState("");
  const [novaDescricao, setNovaDescricao] = useState("");
  // const [novoLocalId, setNovoLocalId] = useState("");
  //const [novaImagem, setNovaImagem] = useState("");

  // Estado para controlar a exibição da seção de edição
  const [editing, setEditing] = useState(false);

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

  const editarproduto = async () => {
    setEditing(true); // Define o modo de edição como verdadeiro
  };

  // Função para salvar a edição do produto
  const salvarEdicao = async () => {
    try {
      console.log("Valores antes da edição:");
      console.log("Novo Nome:", novoNome);
      console.log("Novo Código de Barras:", novoCodigoBarras);
      console.log("Nova Descrição:", novaDescricao);

      const response = await axios.put(
        `http://localhost:3002/produto/${selectedItem.id}`,
        {
          nome: novoNome,
          codigo_barras: novoCodigoBarras,
          descricao: novaDescricao,
          // local_id: novoLocalId,
          //   imagem: novaImagem,
        }
      );
      if (response.status === 200) {
        console.log("Produto editado com sucesso.");
        setEditing(false);
      } else {
        console.error("Erro ao editar produto:", response.data.error);
      }
    } catch (error) {
      console.error("Erro ao editar produto:", error);
    }
  };

  const excluirproduto = () => {
    console.log("aqui vc exclui as coisas ");
  };

  const editarendereco = () => {
    `http://localhost:3002/endereco?=$`;
  };

  const excluirendereco = () => {
    console.log("aqui vc exclui as coisas ");
  };

  function getItemDetails() {
    return (
      <>
        <div className="itemsmodal">
          {selectedItem && "nome" in selectedItem && (
            <>
              <h2>Detalhes do Produto</h2>
              {/* Renderize os campos de edição se o modo de edição estiver ativado */}
              {editing ? (
                <div>
                  <div>
                    <span>Nome:</span>{" "}
                    <input
                      type="text"
                      value={novoNome}
                      onChange={(e) => setNovoNome(e.target.value)}
                    />
                  </div>
                  <div>
                    <span>Código de Barras:</span>{" "}
                    <input
                      type="number"
                      value={novoCodigoBarras}
                      onChange={(e) => setNovoCodigoBarras(e.target.value)}
                    />
                  </div>
                  <div>
                    <span>Descrição:</span>{" "}
                    <input
                      type="text"
                      value={novaDescricao}
                      onChange={(e) => setNovaDescricao(e.target.value)}
                    />
                  </div>
                  {/* <div>
                    <span>Local ID:</span>{" "}
                    <input
                      type="text"
                      value={novoLocalId}
                      onChange={(e) => setNovoLocalId(e.target.value)}
                    />
                  </div> */}
                  {/* <div>
                    <span>Imagem:</span>{" "}
                    <input
                      type="text"
                      value={novaImagem}
                      onChange={(e) => setNovaImagem(e.target.value)}
                    />
                  </div> */}
                  <button className="btn" onClick={salvarEdicao}>
                    Salvar
                  </button>
                  <button className="btn" onClick={() => setEditing(false)}>
                    Cancelar
                  </button>
                </div>
              ) : (
                <>
                  <Imgg imagePath={selectedItem.imagem} size="100px" />
                  <p>Nome: {selectedItem.nome}</p>
                  <p>Descrição: {selectedItem.descricao}</p>
                  <p>CodBarras: {selectedItem.codigo_barras}</p>
                  <p>Local: {selectedItem.local_id}</p>
                  <button className="btn" onClick={editarproduto}>
                    Editar
                  </button>
                  <button className="btn-ex" onClick={excluirproduto}>
                    Excluir
                  </button>
                </>
              )}
            </>
          )}
          {selectedItem && "predio" in selectedItem && (
            // Renderizar detalhes do endereço se o selectedItem for um endereço
            <>
              <span>Endereço COMPLETO:</span>
              <p>
                NOME: {selectedItem.predio}, <br />
                RUA: {selectedItem.rua}, <br />
                ANDAR: {selectedItem.andar}, <br />
                APARTAMENTO: {selectedItem.apartamento}, <br />
                LOCAL: {selectedItem.local_id}
              </p>
              {/* <button onClick={editar}>editar</button>
              <button onClick={excluir}>excluir</button> */}
            </>
          )}
          {!selectedItem && (
            // Renderizar mensagem se nenhum item estiver selecionado
            <p>Selecione um produto ou endereço válido.</p>
          )}
        </div>
      </>
    );
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

  const Results = () => {
    return (
      <div className="results-container">
        {loading && <ReactLoading type={"spin"} color={"#000"} />}{" "}
        {!loading && (
          <>
            {dataFiltered.length === 0 && filterOn && (
              <p>Nenhum resultado foi encontrado.</p>
            )}
            <div className="results-list">
              {dataFiltered !== undefined && filterOn === true ? (
                <div>
                  <h2>Resultados de Endereços:</h2>{" "}
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
                          Visualizar
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

      <console className="log">console.log('clear')</console>
    </div>
  );
};

export default ConsultaGeral;
