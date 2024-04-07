/*import React from "react";
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

    /*  {showCadastro ? (
        <div>
          <h1>Cadastro</h1>
          <p>Selecione uma opção de cadastro:</p>
       /*   <button
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
          {showCadastroProduto && <CadastroProduto />}
          {showCadastroEndereco && <CadastroEndereco />}
          {showCadastroLocal && <CadastroLocal />}
          <button className="btn-log" onClick={fecharAbasCadastro}>
            Voltar para o Cadastro
          </button>
        </div>
      )}

      <button className="btn-log">
        <Link to="/">Voltar</Link>
      </button>
    </div>
  );
};

export default CadastroGeralView;*/