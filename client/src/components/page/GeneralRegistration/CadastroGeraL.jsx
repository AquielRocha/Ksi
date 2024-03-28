import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cadastro.scss';
import CadastroProduto from '../Crud/CadastroProduto';
import CadastroEndereco from '../Crud/CadastroEndereco';
import CadastroLocal from '../Crud/CadastroLocal';

const CadastroGeral = () => {
  const [showCadastro, setShowCadastro] = useState(true); // Novo estado para controlar a exibição do Cadastro
  const [showCadastroProduto, setShowCadastroProduto] = useState(false);
  const [showCadastroEndereco, setShowCadastroEndereco] = useState(false);
  const [showCadastroLocal, setShowCadastroLocal] = useState(false);

  // Função para fechar todas as abas de cadastro
  const fecharAbasCadastro = () => {
    setShowCadastroProduto(false);
    setShowCadastroEndereco(false);
    setShowCadastroLocal(false);
  };

  return (
    <div className="cadastro">
      {/* Exibir o Cadastro ou o conteúdo correspondente */}
      {showCadastro ? (
        <div>
          <h1 >Cadastro</h1>
          <p>Selecione uma opção de cadastro:</p>
          {/* Botões para mostrar o conteúdo correspondente de cadastro */}
          <button className='btn-log' onClick={() => { fecharAbasCadastro(); setShowCadastroProduto(true); setShowCadastro(false); }}>Produto</button>
          <button className='btn-log' onClick={() => { fecharAbasCadastro(); setShowCadastroEndereco(true); setShowCadastro(false); }}>Cadastro de Endereço</button>
          <button className='btn-log' onClick={() => { fecharAbasCadastro(); setShowCadastroLocal(true); setShowCadastro(false); }}>Cadastro Local</button>
        </div>
      ) : (
        <div>
          {/* Renderização condicional dos componentes de cadastro */}
          {showCadastroProduto && <CadastroProduto />}
          {showCadastroEndereco && <CadastroEndereco />}
          {showCadastroLocal && <CadastroLocal />}
          {/* Botão de voltar para a tela de Cadastro original */}
          <button className='btn-log' onClick={() => setShowCadastro(true)}>Voltar para o Cadastro</button>
        </div>
      )}

      {/* Botão de voltar */}
      <button className='btn-log'><Link to='/'>Voltar</Link></button>
    </div>
  );
};  

export default CadastroGeral;
