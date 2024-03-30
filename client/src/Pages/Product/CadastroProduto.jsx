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
    // Verifica se algum campo está vazio
    if (
      !nome.trim() ||
      !descricao.trim() ||
      !codigo_barras.trim() ||
      !local ||
      !imagem
    ) {
      window.alert("Por favor, preencha todos os campos.");
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
        window.alert("Produto cadastrado com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao cadastrar produto:", error);
      });
  };

  return (
    <div className="cadastro-produto-container">
      <h1>Cadastro de Produto</h1>
      <Link to="/">Página Principal</Link>

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
          <textarea
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="codigo_barras">Codigo de barras</label>
          <textarea
            id="codigo_barras"
            value={codigo_barras}
            onChange={(e) => setCodigo_barras(e.target.value)}
          />
        </div>

        <div className="input-container">
          <label htmlFor="local">Local:</label>
          <select
            id="local"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
          >
            <option key="default" value="">
              Selecione o local
            </option>
            {locais.map((local) => (
              <option key={local.id} value={local.id}>
                {local.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="input-container">
          <label htmlFor="imagem">Imagem do Produto:</label>
          <Images setImagem={setImagem} />
        </div>

        <button onClick={handleCadastroProduto}>Cadastrar Produto</button>
      </div>
    </div>
  );
};

export default Produto;
