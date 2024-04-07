import React, { useState } from "react";
import CadastroProduto from "../Product/CadastroProduto";
import CadastroEndereco from "../Adress/CadastroEndereco";
import CadastroLocal from "../Locale/CadastroLocal";
import Header from "../../Components/Header/Headers";
import Background from "../../Components/Background/Background";
import { useSpring, animated } from "react-spring";

const CadastroGeral = () => {
  // Estado para armazenar o botão selecionado
  const [selectedButton, setSelectedButton] = useState("");

  // Função para lidar com o clique no botão
  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName); // Define o botão como selecionado
  };

  return (
    <>
      <div className="cima">
        <Header />
      </div>

      <Background />
      <div className="cadastro">
        {/* Renderização dos botões */}
        <div className="headercad">
          {/* Botão "Cadastro de Endereço" */}
          <button
            // Adiciona a classe 'selected' se o botão de endereço estiver selecionado
            className={`btn-log ${
              selectedButton === "endereco" ? "selected" : ""
            }`}
            // Define a função a ser executada quando o botão for clicado, passando "endereco" como parâmetro
            onClick={() => handleButtonClick("endereco")}
          >
            Cadastro de Endereço
          </button>

          {/* Botão "Cadastro Local" */}
          <button
            // Adiciona a classe 'selected' se o botão de local estiver selecionado
            className={`btn-log ${
              selectedButton === "local" ? "selected" : ""
            }`}
            // Define a função a ser executada quando o botão for clicado, passando "local" como parâmetro
            onClick={() => handleButtonClick("local")}
          >
            Cadastro Local
          </button>

          {/* Botão "Produto" */}
          <button
            // Adiciona a classe 'selected' se o botão de produto estiver selecionado
            className={`btn-log ${
              selectedButton === "produto" ? "selected" : ""
            }`}
            // Define a função a ser executada quando o botão for clicado, passando "produto" como parâmetro
            onClick={() => handleButtonClick("produto")}
          >
            Cadastro de Produto
          </button>
        </div>
        <animated.div>
          {selectedButton === "produto" && <CadastroProduto />}
          {selectedButton === "endereco" && <CadastroEndereco />}
          {selectedButton === "local" && <CadastroLocal />}
        </animated.div>
      </div>
    </>
  );
};

export default CadastroGeral;
