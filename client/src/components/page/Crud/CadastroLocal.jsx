import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Local = () => {
  const [nomeLocal, setNomeLocal] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3002/local', { nome: nomeLocal });

      if (response.status === 200) {
        setNomeLocal('');
      } else {
        throw new Error('Erro ao adicionar local');
      }
    } catch (error) {
      console.error('Erro ao enviar local:', error);
      setError('Ocorreu um erro ao adicionar local');
    }
  };

  return (
    <div>
      <h1>Gerenciamento de Locais</h1>
      <Link to={'/'}><button>Voltar</button></Link>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome do local"
          value={nomeLocal}
          onChange={(event) => setNomeLocal(event.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
};

export default Local;
