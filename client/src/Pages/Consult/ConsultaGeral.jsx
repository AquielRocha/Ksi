import React, { useState, useEffect } from "react";
import axios from "axios";

// Componentes
import Header from "../../Components/Header/Headers";
import Imgg from "../../Components/Imgg/Image";
import Background from "../../Components/Background/Background";
import Voltar from "../../Components/Return/Voltar";
import Modal from "../../Components/Modal/modal";

// Ícones
import { VscSearch } from "react-icons/vsc";

// Componente de carregamento
import ReactLoading from "react-loading";

const ConsultaGeral = () => {
  // Estados
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("endereco");
  const [results, setResults] = useState([]);
  const [filterOn, setFilterOn] = useState(false);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editpro, setEditPro] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [locais, setLocais] = useState([]);
  const [edit, setEdit] = useState({
    rua: "",
    predio: "",
    andar: "",
    apartamento: "",
    local_id: "",
  });

  const [editp, setEditp] = useState({
    nome: "",
    descricao: "",
    codigo_barras: "",
    local_id: "",
  });

  useEffect(() => {
    // Carregar locais disponíveis
    axios
      .get("http://localhost:3002/local")
      .then((response) => {
        setLocais(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar locais:", error);
      });
  }, []);

  // Manipulador de evento para abrir o modal e definir o item selecionado
  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  // Manipulador de evento para fechar o modal
  // Manipulador de evento para fechar o modal e limpar o estado de edição
  const handleCloseModal = () => {
    setSelectedItem(null);
    setModalOpen(false);
    setEditPro(true); // Limpa o estado de edição ao fechar o modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEdit((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setEditp((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3002/endereco/${selectedItem.id}`,
        edit
      );
      console.log("Endereço editado com sucesso:", response.data);
      setSelectedItem({ ...selectedItem, ...edit });
      setEditPro(true);
      setEditMode(false); // Volta para o modo de visualização
    } catch (error) {
      console.error("Erro ao editar endereço:", error.response.data);
    }
  };

  const handleSaveP = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3002/produto/${selectedItem.id}`,
        editp
      );
      console.log("Produto editado com sucesso:", response.data);
      setSelectedItem({ ...selectedItem, ...editp });
      setEditPro(true);
      setEditMode(false); // Volta para o modo de visualização
    } catch (error) {
      console.error("Erro ao editar o produto:", error.response.data);
    }
  };

  const excluirendereco = async () => {
    try {
      if (selectedItem) {
        const response = await axios.delete(
          `http://localhost:3002/endereco/${selectedItem.id}`, // Acessa o ID do endereço
          {
            headers: {
              accept: "*/*",
            },
          }
        );
        console.log("Item excluído com sucesso:", response.data);
      } else {
        console.error("Nenhum item selecionado.");
      }
    } catch (error) {
      if (error.response) {
        // Verifica se error.response existe antes de acessar error.response.data
        console.error("Erro ao excluir item:", error.response.data);
      } else {
        console.error("Erro ao excluir item:", error.message); // Se error.response não existir, use error.message para exibir uma mensagem de erro
      }
    }
  };

  const excluirproduto = async () => {
    try {
      if (selectedItem) {
        const response = await axios.delete(
          `http://localhost:3002/produto/${selectedItem.id}`, // Acessa o ID do prduto
          {
            headers: {
              accept: "*/*",
            },
          }
        );
        console.log("produtinn excluído com sucesso:", response.data);
      } else {
        console.error("Nenhum item selecionado.");
      }
    } catch (error) {
      if (error.response) {
        // Verifica se error.response existe antes de acessar error.response.data
        console.error("Erro ao excluir produto:", error.response.data);
      } else {
        console.error("Erro ao excluir prooo", error.message); // Se error.response não existir, use error.message para exibir uma mensagem de erro
      }
    }
  };

  function getItemDetails() {
    return (
      <>
        <div className="itemsmodal">
          {selectedItem && "nome" in selectedItem && (
            <>
              <Imgg imagePath={selectedItem.imagem} size="160px" />
              <span className="mini">
                Nome:{" "}
                {editpro ? (
                  selectedItem.nome
                ) : (
                  <input
                    type="text"
                    name="nome"
                    value={editp.nome}
                    onChang
                    e={handleInputChange}
                  />
                )}
              </span>{" "}
              <span className="mini">
                Descrição:{" "}
                {editpro ? (
                  selectedItem.descricao
                ) : (
                  <input
                    type="text"
                    name="descricao"
                    value={editp.descricao}
                    onChange={handleInputChange}
                  />
                )}
              </span>
              <span className="mini">
                CodBarras:{" "}
                {editpro ? (
                  selectedItem.codigo_barras
                ) : (
                  <input
                    type="text"
                    name="codigo_barras"
                    value={editp.codigo_barras}
                    onChange={handleInputChange}
                  />
                )}
              </span>
              <span className="mini">
                Local:{" "}
                {editpro ? (
                  selectedItem.local_id
                ) : (
                  <select
                    name="local_id"
                    value={editp.local_id}
                    onChange={handleInputChange}
                  >
                    <option className="option-default" key="default" value="">
                      Selecione o local
                    </option>
                    {locais.map((local) => (
                      <option key={local.id} value={local.id}>
                        {local.nome}
                      </option>
                    ))}
                  </select>
                )}
              </span>
              <button
                className={editpro ? "btn" : "btn-hidden"}
                onClick={() => setEditPro(false)}
              >
                Editar
              </button>
              <button className="btn-ex" onClick={excluirproduto}>
                Excluir
              </button>
              {!editpro && (
                <button className="btn" onClick={handleSaveP}>
                  Salvar
                </button>
              )}
            </>
          )}
          {selectedItem && "predio" in selectedItem && (
            <>
              <p>
                RUA:{" "}
                {editpro ? (
                  selectedItem.rua
                ) : (
                  <input
                    type="text"
                    name="rua"
                    value={edit.rua}
                    onChange={handleInputChange}
                  />
                )}
                <br />
              </p>
              <p>
                PREDIO:{" "}
                {editpro ? (
                  selectedItem.predio
                ) : (
                  <input
                    type="text"
                    name="predio"
                    value={edit.predio}
                    onChange={handleInputChange}
                  />
                )}
                <br />
              </p>
              <p>
                ANDAR:{" "}
                {editpro ? (
                  selectedItem.andar
                ) : (
                  <input
                    type="text"
                    name="andar"
                    value={edit.andar}
                    onChange={handleInputChange}
                  />
                )}
                <br />
              </p>
              <p>
                APARTAMENTO:{" "}
                {editpro ? (
                  selectedItem.apartamento
                ) : (
                  <input
                    type="text"
                    name="apartamento"
                    value={edit.apartamento}
                    onChange={handleInputChange}
                  />
                )}
                <br />
              </p>
              <p>
                LOCAL:{" "}
                {editpro ? (
                  selectedItem.local_id
                ) : (
                  <select
                    name="local_id"
                    value={edit.local_id}
                    onChange={handleInputChange}
                  >
                    <option className="option-default" key="default" value="">
                      Selecione o local
                    </option>
                    {locais.map((local) => (
                      <option key={local.id} value={local.id}>
                        {local.nome}
                      </option>
                    ))}
                  </select>
                )}
                <br />
              </p>

              <button
                className={editpro ? "btn" : "btn-hidden"}
                onClick={() => setEditPro(false)}
              >
                Editar
              </button>

              <button className="btn-ex" onClick={excluirendereco}>
                Excluir
              </button>
              {!editpro && (
                <button className="btn" onClick={handleSave}>
                  Salvar
                </button>
              )}
            </>
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

  const handleSubmit = async (e) => {
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

    try {
      const response = await axios.put(
        `http://localhost:3002/endereco/${selectedItem.id}`,
        Edit
      );
      console.log("Endereço editado com sucesso:", response.data);
      // Atualiza o estado Edit
      setEdit({
        rua: "",
        predio: "",
        andar: "",
        apartamento: "",
        local_id: "",
      });
      // Volta para o modo de visualização
      setEditPro(true);
    } catch (error) {
      console.error("Erro ao editar endereço:", error.response.data);
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
                  {dataFiltered.map((result) => (
                    <div unic className="unico" key={result.id}>
                      <div className="result-item">
                        {filterOption === "produto" && (
                          <Imgg imagePath={result.imagem} size="100px" />
                        )}
                        {Object.entries(result).map(([key, value]) => {
                          if (key !== "imagem") {
                            return (
                              <div key={key} className="result-item">
                                <span className="result-field-name">
                                  {key}:
                                </span>{" "}
                                <span className="result-field-value">
                                  {value}
                                </span>
                              </div>
                            );
                          }
                        })}

                        <button
                          className=""
                          onClick={() => handleOpenModal(result)}
                        >
                          Visualizar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  {results.map((result) => (
                    <div unic className="unico" key={result.id}>
                      <div className="result-item">
                        {filterOption === "produto" && (
                          <Imgg imagePath={result.imagem} size="100px" />
                        )}
                        {Object.entries(result).map(
                          ([key, value]) =>
                            key !== "imagem" && (
                              <span key={key} className="result-field">
                                {value}
                              </span>
                            )
                        )}
                        <button
                          className="btn"
                          onClick={() => handleOpenModal(result)}
                        >
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
      <div className="consultas">{Results()}</div>
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        getItemDetails={getItemDetails}
      />
    </div>
  );
};

export default ConsultaGeral;
