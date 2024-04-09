const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");

// Configuração do Express
app.use(express.json());
app.use(cors());

// Configuração do Banco de Dados MySQL
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "novobanco",
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar-se ao banco de dados:", err);
  } else {
    console.log("Conectado ao banco de dados MySQL");
  }
});

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Especifica o diretório onde os uploads serão salvos
  },
  filename: function (req, file, cb) {
    // Adicionando timestamp ao nome do arquivo para torná-lo único
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Rota para lidar com o upload de imagens
app.post("/upload", upload.single("imagem"), (req, res) => {
  // Verifica se o arquivo foi enviado corretamente
  if (!req.file) {
    return res.status(400).send("Nenhum arquivo enviado.");
  }

  console.log("Arquivo enviado:", req.file);

  // Retorna o caminho do arquivo enviado
  res.send({ imagePath: req.file.path });
});


// Inserir novo usuário
app.post("/usuario", (req, res) => {
  const { nome, email, senha } = req.body;
  const SQL = "INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)";
  db.query(SQL, [nome, email, senha], (err, result) => {
    if (err) {
      console.error("Erro ao inserir usuário:", err);
      res.status(500).send({ error: "Erro interno do servidor" });
    } else {
      console.log("Novo usuário inserido com sucesso");
      res.send({ message: "Novo usuário inserido com sucesso" });
    }
  });
});

// Consultar todos os usuários
app.get("/usuario", (req, res) => {
  const SQL = "SELECT * FROM usuario";
  db.query(SQL, (err, result) => {
    if (err) {
      console.error("Erro ao consultar usuários:", err);
      res.status(500).send({ error: "Erro interno do servidor" });
    } else {
      res.send(result);
    }
  });
});

// Editar usuário
app.put("/usuario/:id", (req, res) => {
  const { nome, email, senha } = req.body;
  const { id } = req.params;
  const SQL = "UPDATE usuario SET nome = ?, email = ?, senha = ? WHERE id = ?";
  db.query(SQL, [nome, email, senha, id], (err, result) => {
    if (err) {
      console.error("Erro ao editar usuário:", err);
      res.status(500).send({ error: "Erro interno do servidor" });
    } else {
      console.log("Usuário editado com sucesso");
      res.send({ message: "Usuário editado com sucesso" });
    }
  });
});

// Excluir usuário
app.delete("/usuario/:id", (req, res) => {
  const { id } = req.params;
  const SQL = "DELETE FROM usuario WHERE id = ?";
  db.query(SQL, [id], (err, result) => {
    if (err) {
      console.error("Erro ao excluir usuário:", err);
      res.status(500).send({ error: "Erro interno do servidor" });
    } else {
      console.log("Usuário excluído com sucesso");
      res.send({ message: "Usuário excluído com sucesso" });
    }
  });
});

/// Autenticar usuário
app.post("/login", (req, res) => {
  const { userName, password } = req.body; // Corrigido para 'userName' em vez de 'nome'
  const SQL = "SELECT * FROM usuario WHERE nome = ? AND senha = ?"; // Corrigido para 'nome' em vez de 'userName'
  db.query(SQL, [userName, password], (err, result) => {
    if (err) {
      console.error("Erro ao autenticar usuário:", err);
      res.status(500).send({ error: "Erro interno do servidor" });
    } else {
      if (result.length > 0) {
        console.log("Usuário autenticado com sucesso");
        res.send({ message: "Login bem-sucedido" });
      } else {
        console.log("Credenciais inválidas");
        res.status(401).send({ error: "Credenciais inválidas" });
      }
    }
  });
});

// Adicionar novo endereço
app.post("/endereco", (req, res) => {
  const { rua, predio, andar, apartamento, usuario_id } = req.body;
  const SQL =
    "INSERT INTO endereco (rua, predio, andar, apartamento, usuario_id) VALUES (?, ?, ?, ?, ?)";
  db.query(
    SQL,
    [rua, predio, andar, apartamento, usuario_id],
    (err, result) => {
      if (err) {
        console.error("Erro ao inserir endereço:", err);
        res.status(500).send({ error: "Erro interno do servidor" });
      } else {
        console.log("Novo endereço inserido com sucesso");
        res.send({ message: "Novo endereço inserido com sucesso" });
      }
    }
  );
});

// Consultar todos os endereços
app.get("/endereco", (req, res) => {
  const SQL = "SELECT * FROM endereco";
  db.query(SQL, (err, result) => {
    if (err) {
      console.error("Erro ao consultar endereços:", err);
      res.status(500).send({ error: "Erro interno do servidor" });
    } else {
      res.send(result);
    }
  });
});

// Editar endereço
app.put("/endereco/:id", (req, res) => {
  const { rua, predio, andar, apartamento, usuario_id } = req.body;
  const { id } = req.params;
  const SQL =
    "UPDATE endereco SET rua = ?, predio = ?, andar = ?, apartamento = ?, usuario_id = ? WHERE id = ?";
  db.query(
    SQL,
    [rua, predio, andar, apartamento, usuario_id, id],
    (err, result) => {
      if (err) {
        console.error("Erro ao editar endereço:", err);
        res.status(500).send({ error: "Erro interno do servidor" });
      } else {
        console.log("Endereço editado com sucesso");
        res.send({ message: "Endereço editado com sucesso" });
      }
    }
  );
});

// Excluir endereço
app.delete("/endereco/:id", (req, res) => {
  const { id } = req.params;
  const SQL = "DELETE FROM endereco WHERE id = ?";
  db.query(SQL, [id], (err, result) => {
    if (err) {
      console.error("Erro ao excluir endereço:", err);
      res.status(500).send({ error: "Erro interno do servidor" });
    } else {
      console.log("Endereço excluído com sucesso");
      res.send({ message: "Endereço excluído com sucesso" });
    }
  });
});

// Adicionar novo local
app.post("/Local", (req, res) => {
  const { nome } = req.body;
  const SQL = "INSERT INTO local (nome) VALUES (?)";
  db.query(SQL, [nome], (err, result) => {
    if (err) {
      console.error("Erro ao inserir local:", err);
      res.status(500).send({ error: "Erro interno do servidor" });
    } else {
      console.log("Novo local inserido com sucesso");
      res.send({ message: "Novo local inserido com sucesso" });
    }
  });
});

// Consultar todos os locais
app.get("/local", (req, res) => {
  const SQL = "SELECT * FROM local";
  db.query(SQL, (err, result) => {
    if (err) {
      console.error("Erro ao consultar locais:", err);
      res.status(500).send({ error: "Erro interno do servidor" });
    } else {
      res.send(result);
    }
  });
});

// Editar local
app.put("/local/:id", (req, res) => {
  const { nome } = req.body;
  const { id } = req.params;
  const SQL = "UPDATE local SET nome = ? WHERE id = ?";
  db.query(SQL, [nome, id], (err, result) => {
    if (err) {
      console.error("Erro ao editar local:", err);
      res.status(500).send({ error: "Erro interno do servidor" });
    } else {
      console.log("Local editado com sucesso");
      res.send({ message: "Local editado com sucesso" });
    }
  });
});

// Excluir local
app.delete("/local/:id", (req, res) => {
  const { id } = req.params;
  const SQL = "DELETE FROM local WHERE id = ?";
  db.query(SQL, [id], (err, result) => {
    if (err) {
      console.error("Erro ao excluir local:", err);
      res.status(500).send({ error: "Erro interno do servidor" });
    } else {
      console.log("Local excluído com sucesso");
      res.send({ message: "Local excluído com sucesso" });
    }
  });
});


//novo prodiuto 
app.post("/produto", upload.single("imagem"), (req, res) => {
  const { nome, descricao, codigo_barras, local_id } = req.body;
  const nomeImagem = req.file.filename; // Nome do arquivo enviado pelo multer
  const SQL =
    "INSERT INTO produto (nome, descricao, codigo_barras, local_id, imagem) VALUES (?, ?, ?, ?, ?)";
  db.query(SQL, [nome, descricao, codigo_barras, local_id, nomeImagem], (err, result) => {
    if (err) {
      console.error("Erro ao inserir produto:", err);
      res.status(500).send({ error: "Erro interno do servidor" });
    } else {
      console.log("Novo produto inserido com sucesso");
      res.send({ message: "Novo produto inserido com sucesso" });
    }
  });
});


// Consultar todos os produtos
app.get("/produto", (req, res) => {
  const SQL = "SELECT * FROM produto";
  db.query(SQL, (err, result) => {
    if (err) {
      console.error("Erro ao consultar produtos:", err);
      res.status(500).send({ error: "Erro interno do servidor" });
    } else {
      res.send(result);
    }
  });
});

// Editar produto
app.put("/produto/:id", (req, res) => {
  const { nome, codigo_barras, local_id, imagem } = req.body;
  const { id } = req.params;
  const SQL =
    "UPDATE produto SET nome = ?, codigo_barras = ?, local_id = ?, imagem = ? WHERE id = ?";
  db.query(SQL, [nome, codigo_barras, local_id, imagem, id], (err, result) => {
    if (err) {
      console.error("Erro ao editar produto:", err);
      res.status(500).send({ error: "Erro interno do servidor" });
    } else {
      console.log("Produto editado com sucesso");
      res.send({ message: "Produto editado com sucesso" });
    }
  });
});

// Excluir produto
app.delete("/produto/:id", (req, res) => {
  const { id } = req.params;
  const SQL = "DELETE FROM produto WHERE id = ?";
  db.query(SQL, [id], (err, result) => {
    if (err) {
      console.error("Erro ao excluir produto:", err);
      res.status(500).send({ error: "Erro interno do servidor" });
    } else {
      console.log("Produto excluído com sucesso");
      res.send({ message: "Produto excluído com sucesso" });
    }
  });
});

// Iniciar o servidor na porta especificada
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Servidor está funcionando na porta ${PORT}`);
});



