import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Importe o Axios

function Endereco() {
  const [endereco, setEndereco] = useState({
    rua: '',
    predio: '',
    andar: '',
    apartamento: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEndereco(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3002/endereco', endereco); // Enviar os dados usando Axios

      // Verificar se a resposta é OK (código 200)
      if (response.status === 200) {
        setSuccessMessage('Endereço inserido com sucesso');

  
      } else {
        throw new Error('Erro ao adicionar endereço');
      }
    } catch (error) {
      console.error('Erro ao enviar endereço:', error);
      setError('Ocorreu um erro ao adicionar endereço');
    }
  };

  return (
    <div>
      <h1>Gerenciamento de endereços</h1>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rua">Rua:</label>
          <input type="text" id="rua" name="rua" value={endereco.rua} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="predio">Prédio:</label>
          <input type="text" id="predio" name="predio" value={endereco.predio} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="andar">Andar:</label>
          <input type="text" id="andar" name="andar" value={endereco.andar} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="apartamento">Apartamento:</label>
          <input type="text" id="apartamento" name="apartamento" value={endereco.apartamento} onChange={handleChange} />
        </div>
        {error && <div className="error">{error}</div>}
        {successMessage && <div className="success">{successMessage}</div>}
        <button type="submit" className="btn-re">
          Adicionar
        </button>
      </form>
    </div>
  );
}

export default Endereco;
