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
  const [enderecos, setEnderecos] = useState([]);
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
    endereco_id: "",
  });

  useEffect(() => {
    // Carregar enderecos disponíveis
    axios
      .get("http://localhost:3002/endereco")
      .then((response) => {
        setEnderecos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar endereços:", error);
      });
  }, []);
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
      if (!selectedItem) {
        console.error("Nenhum item selecionado.");
        return;
      }

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
      if (!selectedItem) {
        console.error("Nenhum item selecionado.");
        return;
      }

      const response = await axios.put(
        `http://localhost:3002/produto/${selectedItem.produto_id}`,
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
          `http://localhost:3002/produto/${selectedItem.produto_id}`, // Acessa o ID do prduto
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
          {selectedItem && "produto_id" in selectedItem && (
            <>
              <Imgg imagePath={selectedItem.imagem} size="160px" />
              <span className="mini">
                Nome:{" "}
                {editpro ? (
                  selectedItem.produto_nome
                ) : (
                  <input
                    type="text"
                    name="nome"
                    value={editp.nome}
                    onChange={handleInputChange}
                  />
                )}
              </span>{" "}
              <span className="mini">
                Descrição:{" "}
                {editpro ? (
                  selectedItem.produto_descricao
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
                  selectedItem.produto_codigo_barras
                ) : (
                  <input
                    type="number"
                    name="codigo_barras"
                    value={editp.codigo_barras}
                    onChange={handleInputChange}
                  />
                )}
              </span>
              <span className="mini">
                Local:{" "}
                {editpro ? (
                  selectedItem.local_nome
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
              <span className="mini">
                Endereco:{" "}
                {editpro ? (
                  selectedItem.endereco_id
                ) : (
                  <select
                    name="endereco_id"
                    value={editp.endereco_id}
                    onChange={handleInputChange}
                  >
                    <option className="option-default" key="default" value="">
                      Selecione o endereco
                    </option>
                    {enderecos.map((endereco) => (
                      <option key={endereco.id} value={endereco.id}>
                        {endereco.predio}
                      </option>
                    ))}
                  </select>
                )}
              </span>
              <h4>Endereço</h4>
              <span className="mini">
                Rua:{" "}
                {editpro ? (
                  selectedItem.endereco_rua
                ) : (
                  <input
                    disabled
                    type="text"
                    name=" endereco_rua"
                    value={editp.endereco_rua}
                    onChange={handleInputChange}
                  />
                )}
              </span>
              <span className="mini">
                Andar:{" "}
                {editpro ? (
                  selectedItem.endereco_andar
                ) : (
                  <input
                    disabled
                    type="text"
                    name=" endereco_andar"
                    value={editp.endereco_andar}
                    onChange={handleInputChange}
                  />
                )}
              </span>
              <span className="mini">
                Rua:{" "}
                {editpro ? (
                  selectedItem.endereco_apartamento
                ) : (
                  <input
                    disabled
                    type="text"
                    name=" endereco_apartamento"
                    value={editp.endereco_apartamento}
                    onChange={handleInputChange}
                  />
                )}
              </span>
              <span className="mini">
                Predio:{" "}
                {editpro ? (
                  selectedItem.endereco_predio
                ) : (
                  <input
                    disabled
                    type="text"
                    name=" endereco_predio"
                    value={editp.endereco_predio}
                    onChange={handleInputChange}
                  />
                )}
              </span>
              {selectedItem && "produto_nome" in selectedItem && (
                <button
                  className={editpro ? "btn" : "btn-hidden"}
                  onClick={() => setEditPro(false)}
                >
                  Editar
                </button>
              )}
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
              <h2>Detalhes Endereço</h2>
              <span className="mini">
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
              </span>
              <span className="mini">
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
              </span>
              <span className="mini">
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
              </span>
              <span className="mini">
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
              </span>
              <span className="mini">
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
              </span>

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
        results.filter(({ produto_nome }) => {
          return produto_nome.toLowerCase() === searchTerm.toLowerCase();
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
                        <span> {result.produto_nome}</span>
                        <span> Local:{result.local_nome}</span>
                        <span> CodBarras:{result.produto_codigo_barras}</span>
                        <span> Endereço: {result.endereco_predio}</span>

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
