import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import Images from "../../Components/Image/Images";

const Produto = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [codigo_barras, setCodigo_barras] = useState("");
  const [imagem, setImagem] = useState(null);
  const [local, setLocal] = useState("");
  const [locais, setLocais] = useState([]);
  const navigateTo = useNavigate();
  const [error, setError] = useState(""); // Estado para mensagens de erro
  const [successMessage, setSuccessMessage] = useState(""); // Estado para mensagens de sucesso

  useEffect(() => {
    // Carregar os locais disponíveis ao montar o componente
    Axios.get("http://localhost:3002/local")
      .then((response) => {
        setLocais(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar os locais:", error);
      });
  }, []);

  const handleCadastroProduto = () => {
    if (
      !nome.trim() ||
      !descricao.trim() ||
      !codigo_barras.trim() ||
      !local ||
      !imagem
    ) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("descricao", descricao);
    formData.append("codigo_barras", codigo_barras);
    formData.append("imagem", imagem);
    formData.append("local_id", local);

    Axios.post("http://localhost:3002/produto", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log(response.data);
        setSuccessMessage("Produto cadastrado com sucesso!");
        setNome("");
        setDescricao("");
        setCodigo_barras("");
        setLocal("");
        setImagem(null);
        setError(""); // Limpa mensagens de erro anteriores, se houver
      })
      .catch((error) => {
        console.error("Erro ao cadastrar produto:", error);
        setError("Erro ao cadastrar produto. Por favor, tente novamente."); // Exibe mensagem de erro para o usuário
        setSuccessMessage(""); // Limpa mensagens de sucesso anteriores, se houver
      });
  };

  return (
    <>
      <div className="cadss">
        <h1>Cadastro de Produto</h1>
      </div>
      <div className="quadro">
        <div className="cadastro-produto-form">
          <div className="input-container">
            <label htmlFor="nome">Nome do Produto:</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="input-container">
            <label htmlFor="descricao">Descrição:</label>
            <input
              type="text"
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="codigo_barras">Codigo de barras</label>
            <input
              type="number"
              id="codigo_barras"
              value={codigo_barras}
              onChange={(e) => setCodigo_barras(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label className="label" htmlFor="local">
              Local:
            </label>
            <div className="select-container">
              <select
                id="local"
                value={local}
                onChange={(e) => setLocal(e.target.value)}
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
            </div>
          </div>

          <div className="input-container">
            <label htmlFor="imagem">Imagem do Produto:</label>
            <Images setImagem={setImagem} />
          </div>
          {/* Exibe a mensagem de erro, se houver */}
          {error && <div className="alert">{error}</div>}
          {/* Exibe a mensagem de sucesso, se houver */}
          {successMessage && <div className="alert-s">{successMessage}</div>}
          {/* Botão para submeter o formulário */}

          <button className="btt" onClick={handleCadastroProduto}>
            Cadastrar Produto
          </button>
        </div>
      </div>
    </>
  );
};

export default Produto;
