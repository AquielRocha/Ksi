import React, { useState } from "react";
import axios from "axios"; // Importa o Axios para fazer requisições HTTP

const Local = () => {
  // Define os estados para armazenar o nome do local, mensagens de erro e sucesso
  const [nomeLocal, setNomeLocal] = useState(""); // Estado para o nome do local
  const [error, setError] = useState(""); // Estado para mensagens de erro
  const [successMessage, setSuccessMessage] = useState(""); // Estado para mensagens de sucesso

  // Função para lidar com a submissão do formulário
  const handleSubmit = async (event) => {
    event.preventDefault(); // Previne o comportamento padrão de submissão do formulário

    // Verifica se o campo nomeLocal está vazio
    if (!nomeLocal.trim()) {
      setError("Por favor, preencha o campo de nome do local."); // Define a mensagem de erro
      return; // Interrompe o fluxo da função
    }

    try {
      // Envia uma requisição POST para o backend para adicionar um novo local
      const response = await axios.post("http://localhost:3002/local", {
        nome: nomeLocal,
      });

      // Verifica se a requisição foi bem-sucedida
      if (response.status === 200) {
        // Define a mensagem de sucesso
        setSuccessMessage("Local inserido com sucesso");
        // Limpa o campo do nome do local
        setNomeLocal("");
        // Limpa a mensagem de erro, se houver
        setError("");
      } else {
        // Caso contrário, lança um erro
        throw new Error("Erro ao adicionar local");
      }
    } catch (error) {
      // Caso ocorra um erro durante a requisição, trata o erro
      console.error("Erro ao enviar local:", error);
      // Define a mensagem de erro
      setError("Ocorreu um erro ao adicionar local");
    }
  };

  return (
    <div>
      <div className="cadss">
        <h1>Gerenciamento de Locais</h1>
      </div>
      <div className="quadro">
        <form onSubmit={handleSubmit}>
         <label htmlFor=""> NOME</label>
          <input
            type="text"
            placeholder="Nome do local"
            value={nomeLocal}
            onChange={(event) => setNomeLocal(event.target.value)} // Atualiza o estado com o valor do campo de entrada
          />
          {/* Exibe a mensagem de erro, se houver */}
          {error && <div className="error">{error}</div>}
          {/* Exibe a mensagem de sucesso, se houver */}
          {successMessage && <div className="success">{successMessage}</div>}
          {/* Botão para submeter o formulário */}
          <button type="submit" className="btt">
            Adicionar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Local;
