const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

// Configurar o uso do cors que é necessário para o SQL
app.use(express.json());
app.use(cors());

// Abre o server na porta 3002 pois não pode ser a mesma do localhost do vite
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`O servidor está funcionando na porta ${PORT}`);
});

// Ligar o banco ao server
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "novo_banco", // nome do banco
});

// informar quando conectado ao bd
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar-se ao banco de dados:", err);
  } else {
    console.log("Conectado ao bd :)");
  }
});

// rota para se cadastrar
// rota para se cadastrar
app.post("/register", (req, res) => {
  // puxar as variáveis do formulário no corpo da requisição
  const { email, userName, password } = req.body;

  // Criar o comando do SQL para inserir o usuário na tabela 'usuario'
  const SQL = "INSERT INTO usuario (nome, email, Senha) VALUES (?, ?, ?)";
  // Entrar com os valores usando uma variável
  const values = [userName, email, password];

  // fazer a verificação para executar a instrução SQL acima
  db.query(SQL, values, (err, results) => {
    if (err) {
      console.error("Erro ao executar a consulta:", err);
      res.status(500).send({ error: "Erro interno do servidor" });
      return;
    }

    console.log("Usuário cadastrado com sucesso");
    res.send({ message: "Usuário adicionado" });
  });
});

// rota para se logar
app.post("/login", (req, res) => {
  // Extrair as variáveis do formulário no corpo da requisição
  const { userName, password } = req.body;

  // Criar uma instrução SQL para verificar o usuário na tabela 'usuario'
  const SQL = "SELECT * FROM usuario WHERE nome = ? AND Senha = ?";
  // Entrar com os valores usando uma variável
  const values = [userName, password];

  // Consulta para executar a instrução SQL acima
  db.query(SQL, values, (err, results) => {
    if (err) {
      console.error("Erro ao executar a consulta:", err);
      res.status(500).send({ error: "Erro interno do servidor" });
      return;
    }

    if (results.length > 0) {
      console.log("Login bem-sucedido para o usuário:", userName);
      res.send(results);
    } else {
      console.log("Usuário não cadastrado:", userName);
      res.send({ message: "Usuário não cadastrado" });
    }
  });
});

// Rota para buscar os locais disponíveis
app.get("/locais", (req, res) => {
  const SQL = "SELECT * FROM local";

  db.query(SQL, (err, results) => {
    if (err) {
      console.error("Erro ao buscar os locais:", err);
      res.status(500).send({ error: "Erro interno do servidor" });
      return;
    }

    res.send(results);
  });
});

// Rota para adicionar um novo local
app.post("/locais", (req, res) => {
  // Extrair as informações do corpo da requisição
  const { nome } = req.body;

  // Criar uma instrução SQL para inserir um novo local na tabela 'local'
  const SQL = "INSERT INTO local (nome) VALUES (?)";

  // Entrar com os valores usando uma variável
  const values = [nome];

  // Consulta para executar a instrução SQL acima
  db.query(SQL, values, (err, results) => {
    if (err) {
      console.error("Erro ao adicionar um novo local:", err);
      res.status(500).send({ error: "Erro interno do servidor" });
      return;
    }

    console.log("Novo local adicionado com sucesso");
    res.send({ message: "Novo local adicionado" });
  });
});

// rota para se cadastrar endereco
app.post("/endereco", (req, res) => {
  // puxar as variáveis do formulário no corpo da requisição
  const { rua, predio, andar, apartamento } = req.body;

  // Criar o comando do SQL para inserir o endereço na tabela 'endereco'
  const SQL =
    "INSERT INTO endereco (rua, predio, andar, apartamento) VALUES (?, ?, ?, ?)";

  // Entrar com os valores usando uma variável
  const values = [rua, predio, andar, apartamento];

  // fazer a verificação para executar a instrução SQL acima
  db.query(SQL, values, (err, results) => {
    if (err) {
      console.error("Erro ao executar a consulta:", err);
      return res.status(500).send({ error: "Erro interno do servidor" });
    }

    console.log("Endereço cadastrado com sucesso");
    res.send({ message: "Endereço adicionado" });
  });
});
