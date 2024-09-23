const express = require("express");
const app = express();
const { Pool } = require("pg");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Configuração do Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API do Kielzin",
      version: "1.0.0",
      description: "Documentação do real negro",
    },
  },
  apis: ["./index.js"], // Caminho para o seu arquivo principal ou onde estão definidos seus endpoints
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Configuração do Express
app.use(express.json());
app.use(cors());

// Configuração do Banco de Dados PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'novobanco',
  password: 'ASD',
  port: 6000, // Porta padrão do PostgreSQL
});

// Conectar ao banco de dados
pool.connect((err) => {
  if (err) {
    console.error('Erro ao conectar-se ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados PostgreSQL');
  }
});

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Especifica o diretório onde os uploads serão salvos
  },
  filename: function (req, file, cb) {
    // Adicionando timestamp ao nome do arquivo para torná-lo único
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Rota para lidar com o upload de imagens
app.post("/uploads", upload.single("imagem"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("Nenhum arquivo enviado.");
  }

  console.log("Arquivo enviado:", req.file);
  res.send({ imagePath: req.file.path });
});

// Rota para servir as imagens
app.get("/uploads/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, "/uploads", imageName); // Caminho completo para a imagem
  res.sendFile(imagePath);
});

// Inserir novo usuário
app.post("/usuario", (req, res) => {
  const { nome, email, senha } = req.body;
  const SQL = "INSERT INTO usuario (nome, email, senha) VALUES ($1, $2, $3)";
  pool.query(SQL, [nome, email, senha], (err) => {
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
  pool.query(SQL, (err, result) => {
    if (err) {
      console.error("Erro ao consultar usuários:", err);
      res.status(500).send({ error: "Erro interno do servidor" });
    } else {
      res.send(result.rows); // Use result.rows para obter os dados
    }
  });
});

// Editar usuário
app.put("/usuario/:id", (req, res) => {
  const { nome, email, senha } = req.body;
  const { id } = req.params;
  const SQL = "UPDATE usuario SET nome = $1, email = $2, senha = $3 WHERE id = $4";
  pool.query(SQL, [nome, email, senha, id], (err) => {
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
  const SQL = "DELETE FROM usuario WHERE id = $1";
  pool.query(SQL, [id], (err) => {
    if (err) {
      console.error("Erro ao excluir usuário:", err);
      res.status(500).send({ error: "Erro interno do servidor" });
    } else {
      console.log("Usuário excluído com sucesso");
      res.send({ message: "Usuário excluído com sucesso" });
    }
  });
});

// Autenticar usuário
app.post("/login", (req, res) => {
  const { userName, password } = req.body; 
  const SQL = "SELECT * FROM usuario WHERE nome = $1 AND senha = $2";
  pool.query(SQL, [userName, password], (err, result) => {
    if (err) {
      console.error("Erro ao autenticar usuário:", err);
      res.status(500).send({ error: "Erro interno do servidor" });
    } else {
      if (result.rows.length > 0) {
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
  const { rua, predio, andar, apartamento, local_id } = req.body;
  const SQL =
    "INSERT INTO endereco (rua, predio, andar, apartamento, local_id) VALUES ($1, $2, $3, $4, $5)";
  pool.query(SQL, [rua, predio, andar, apartamento, local_id], (err) => {
    if (err) {
      console.error("Erro ao inserir endereço:", err);
      res.status(500).send({ error: "Erro interno do servidor" });
    } else {
      console.log("Novo endereço inserido com sucesso");
      res.send({ message: "Novo endereço inserido com sucesso" });
    }
  });
});

// Consultar todos os endereços
app.get("/endereco", (req, res) => {
  const SQL = "SELECT id, rua, predio, andar, apartamento, local_id FROM endereco";
  pool.query(SQL, (err, result) => {
    if (err) {
      console.error("Erro ao consultar endereços:", err);
      res.status(500).send({ error: "Erro interno do servidor" });
    } else {
      res.send(result.rows);
    }
  });
});

// Editar endereço
app.put("/endereco/:id", (req, res) => {
  const { rua, predio, andar, apartamento, local_id } = req.body;
  const { id } = req.params;
  const SQL =
    "UPDATE endereco SET rua = $1, predio = $2, andar = $3, apartamento = $4, local_id = $5 WHERE id = $6";
  pool.query(
    SQL,
    [rua, predio, andar, apartamento, local_id, id],
    (err) => {
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
  const SQL = "DELETE FROM endereco WHERE id = $1";
  pool.query(SQL, [id], (err) => {
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
app.post("/local", (req, res) => {
  const { nome } = req.body;
  const SQL = "INSERT INTO local (nome) VALUES ($1)";
  pool.query(SQL, [nome], (err) => {
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
  const SQL = "SELECT id, nome FROM local";
  pool.query(SQL, (err, result) => {
    if (err) {
      console.error("Erro ao consultar locais:", err);
      res.status(500).send({ error: "Erro interno do servidor" });
    } else {
      res.send(result.rows);
    }
  });
});

// Editar local
app.put("/local/:id", (req, res) => {
  const { nome } = req.body;
  const { id } = req.params;

  const SQL = "UPDATE local SET nome = $1 WHERE id = $2";
  pool.query(SQL, [nome, id], (err) => {
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
  const SQL = "DELETE FROM local WHERE id = $1";
  pool.query(SQL, [id], (err) => {
    if (err) {
      console.error("Erro ao excluir local:", err);
      res.status(500).send({ error: "Erro interno do servidor" });
    } else {
      console.log("Local excluído com sucesso");
      res.send({ message: "Local excluído com sucesso" });
    }
  });
});

// Adicionar novo produto
app.post("/produto", upload.single("imagem"), (req, res) => {
  const { nome, descricao, codigo_barras, local_id, endereco_id } = req.body;
  const nomeImagem = req.file.filename; // Nome do arquivo enviado pelo multer
  const SQL =
    "INSERT INTO produto (nome, descricao, codigo_barras, local_id, endereco_id, imagem) VALUES ($1, $2, $3, $4, $5, $6)";
  pool.query(
    SQL,
    [nome, descricao, codigo_barras, local_id, endereco_id, nomeImagem],
    (err) => {
      if (err) {
        console.error("Erro ao inserir produto:", err);
        res.status(500).send({ error: "Erro interno do servidor" });
      } else {
        console.log("Novo produto inserido com sucesso");
        res.send({ message: "Novo produto inserido com sucesso" });
      }
    }
  );
});

// Consultar todos os produtos
app.get("/produto", (req, res) => {
  const SQL = `
    SELECT 
      produto.id AS produto_id, 
      produto.imagem,  
      produto.nome AS produto_nome, 
      produto.descricao AS produto_descricao, 
      produto.codigo_barras AS produto_codigo_barras, 
      local.nome AS local_nome, 
      produto.endereco_id AS endereco_id,
      endereco.rua AS endereco_rua, 
      endereco.andar AS endereco_andar, 
      endereco.apartamento AS endereco_apartamento, 
      endereco.predio AS endereco_predio
    FROM produto
    INNER JOIN local ON produto.local_id = local.id
    INNER JOIN endereco ON produto.endereco_id = endereco.id;
  `;

  pool.query(SQL, (err, result) => {
    if (err) {
      console.error("Erro ao consultar produtos:", err);
      res.status(500).send({ error: "Erro interno do servidor" });
    } else {
      res.send(result.rows);
    }
  });
});

// Editar produto
app.put("/produto/:id", (req, res) => {
  const { nome, descricao, codigo_barras, local_id, endereco_id } = req.body;
  const { id } = req.params;
  const SQL =
    "UPDATE produto SET nome = $1, descricao = $2, codigo_barras = $3, local_id = $4, endereco_id = $5 WHERE id = $6";
  pool.query(
    SQL,
    [nome, descricao, codigo_barras, local_id, endereco_id, id],
    (err) => {
      if (err) {
        console.error("Erro ao editar produto:", err);
        res.status(500).send({ error: "Erro interno do servidor" });
      } else {
        console.log("Produto editado com sucesso");
        res.send({ message: "Produto editado com sucesso" });
      }
    }
  );
});

// Excluir produto
app.delete("/produto/:id", (req, res) => {
  const { id } = req.params;
  const SQL = "DELETE FROM produto WHERE id = $1";
  pool.query(SQL, [id], (err) => {
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
