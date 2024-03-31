import React from "react";
import { Link } from "react-router-dom";
import "./CadastroGeral.scss";
import CadastroProduto from "../Product/CadastroProduto";
import CadastroEndereco from "../Adress/CadastroEndereco";
import CadastroLocal from "../Locale/CadastroLocal";
import Header from "../../Components/Header/Headers";
import Background from "../../Components/Background/Background";

const CadastroGeralView = ({
  showCadastro,
  setShowCadastro,
  showCadastroProduto,
  setShowCadastroProduto,
  showCadastroEndereco,
  setShowCadastroEndereco,
  showCadastroLocal,
  setShowCadastroLocal,
  fecharAbasCadastro,
}) => {
  return (
    <div className="cadastro">
      <Header />
      <Background />

      {/* Exibir o Cadastro ou o conteúdo correspondente*/}
      {showCadastro ? (
        <div>
          <h1>Cadastro</h1>
          <p>Selecione uma opção de cadastro:</p>
          {/* Botões para mostrar o conteúdo correspondente de cadastro */}
          <button
            className="btn-log"
            onClick={() => {
              fecharAbasCadastro();
              setShowCadastroProduto(true);
            }}
          >
            Produto
          </button>
          <button
            className="btn-log"
            onClick={() => {
              fecharAbasCadastro();
              setShowCadastroEndereco(true);
            }}
          >
            Cadastro de Endereço
          </button>
          <button
            className="btn-log"
            onClick={() => {
              fecharAbasCadastro();
              setShowCadastroLocal(true);
            }}
          >
            Cadastro Local
          </button>
        </div>
      ) : (
        <div>
          {/* Renderização condicional dos componentes de cadastro */}
          {showCadastroProduto && <CadastroProduto />}
          {showCadastroEndereco && <CadastroEndereco />}
          {showCadastroLocal && <CadastroLocal />}
          {/* Botão de voltar para a tela de Cadastro original */}
          <button className="btn-log" onClick={fecharAbasCadastro}>
            Voltar para o Cadastro
          </button>
        </div>
      )}

      {/* Botão de voltar */}
      <button className="btn-log">
        <Link to="/">Voltar</Link>
      </button>
    </div>
  );
};

export default CadastroGeralView;