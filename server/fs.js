const fs = require("fs");

// Função para verificar se um diretório existe e, se não existir, criar o diretório
const createDirectoryIfNotExists = (directoryPath) => {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true }); // Cria o diretório e qualquer diretório pai que não exista
    console.log(`Diretório '${directoryPath}' criado com sucesso.`);
  } else {
    console.log(`Diretório '${directoryPath}' já existe.`);
  }
};

module.exports = { createDirectoryIfNotExists };
