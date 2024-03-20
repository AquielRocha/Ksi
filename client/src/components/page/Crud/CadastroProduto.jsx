import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './cad.scss';

const Produto = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState('');
  const [local, setLocal] = useState('');
  const [locais, setLocais] = useState([]);
  const navigateTo = useNavigate();

  useEffect(() => {
    // Carregar os locais disponíveis ao montar o componente
    Axios.get('http://localhost:3002/local')
      .then(response => {
        setLocais(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar os locais:', error);
      });
  }, []); // O segundo argumento vazio indica que esta função será executada apenas uma vez, após a montagem do componente

  const handleCadastroProduto = () => {
    // Verifica se o campo nome está vazio
    if (!nome.trim()) {
      window.alert("Por favor, preencha o nome do produto.");
      return;
    }
  
    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('descricao', descricao); // Adiciona a descrição ao formData
    formData.append('imagem', imagem);
    formData.append('Local_idLocal', local);
    
    Axios.post('http://localhost:3002/produto', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log(response.data);
      window.alert("Produto cadastrado com sucesso!");
    })
    .catch(error => {
      console.error('Erro ao cadastrar produto:', error);
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
          <label htmlFor="local">Local:</label>

         <select
  id="local"
  value={local}
  onChange={(e) => setLocal(e.target.value)}
>
  <option key="default" value="">Selecione o local</option>
  {locais.map(local => (
    <option key={local.id} value={local.id}>{local.nome}</option>
  ))}
</select>

        </div>

        <div className="input-container">
          <label htmlFor="imagem">Imagem do Produto:</label>
          <input
            type="file"
            id="imagem"
            accept="image/*"
            onChange={(e) => setImagem(e.target.files[0])}
            required
          />
        </div>

        <button onClick={handleCadastroProduto}>Cadastrar Produto</button>
      </div>
    </div>
  );
};

export default Produto;
