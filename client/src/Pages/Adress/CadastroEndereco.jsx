import React, { useState, useEffect } from "react";
import axios from "axios"; // Importe o Axios

function Endereco() {
  const initialState = {
    rua: "",
    predio: "",
    andar: "",
    apartamento: "",
    local_id: "", // Atualize para local_id
  };

  const [endereco, setEndereco] = useState(initialState);
  const [message, setMessage] = useState("");
  const [locais, setLocais] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3002/local")
      .then((response) => {
        setLocais(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar os locais:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEndereco((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !endereco.rua.trim() ||
      !endereco.predio.trim() ||
      !endereco.andar.trim() ||
      !endereco.apartamento.trim() ||
      !endereco.local_id.trim() // Altere para local_id
    ) {
      setMessage("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3002/endereco",
        endereco
      );

      if (response.status === 200) {
        setMessage("Endereço inserido com sucesso");
        setEndereco(initialState);
      } else {
        throw new Error("Erro ao adicionar endereço");
      }
    } catch (error) {
      console.error("Erro ao enviar endereço:", error);
      setMessage("Ocorreu um erro ao adicionar endereço");
    }
  };

  return (
    <div>
      <div className="cadss">
        <h1>Gerenciamento de endereços</h1>
      </div>

      <div className="quadro">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="rua">Rua:</label>
            <input
              type="text"
              id="rua"
              name="rua"
              value={endereco.rua}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="predio">Prédio:</label>
            <input
              type="text"
              id="predio"
              name="predio"
              value={endereco.predio}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="andar">Andar:</label>
            <input
              type="text"
              id="andar"
              name="andar"
              value={endereco.andar}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="apartamento">Apt:</label>
            <input
              type="text"
              id="apartamento"
              name="apartamento"
              value={endereco.apartamento}
              onChange={handleChange}
            />
          </div>
          {/* Adicionando o campo de seleção de local */}
          <div className="select-container">
            <label htmlFor="local">Local:</label>
            <select
              id="local"
              name="local_id" // Altere para local_id
              value={endereco.local_id} // Altere para endereco.local_id
              onChange={handleChange} // Mantenha o handleChange existente
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
          {message && <div className="alert">{message}</div>}

          <button type="submit" className="btt">
            Adicionar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Endereco;
