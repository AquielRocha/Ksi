const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Rota para lidar com o upload de imagens
app.post("/uploads", upload.single("imagem"), (req, res) => {
  // Verifica se o arquivo foi enviado corretamente
  if (!req.file) {
    return res.status(400).send("Nenhum arquivo enviado.");
  }

  console.log("Arquivo enviado:", req.file);

  // Retorna o caminho do arquivo enviado
  res.send({ imagePath: req.file.path });
});

// Rota para servir as imagens
app.get("/uploads/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, "/uploads", imageName); // Caminho completo para a imagem

  // Envie a imagem como resposta
  res.sendFile(imagePath);
});

/**
 * @swagger
 * /usuario:
 *   post:
 *     description: Cria um novo usuário
 *     parameters:
 *       - name: nome
 *         description: Nome do usuário
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: Email do usuário
 *         in: formData
 *         required: true
 *         type: string
 *       - name: senha
 *         description: Senha do usuário
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /usuario:
 *   get:
 *     description: Obtém todos os usuários
 *     responses:
 *       200:
 *         description: Lista de usuários obtida com sucesso
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /usuario/{id}:
 *   put:
 *     description: Edita um usuário existente
 *     parameters:
 *       - name: id
 *         description: ID do usuário a ser editado
 *         in: path
 *         required: true
 *         type: integer
 *       - name: nome
 *         description: Novo nome do usuário
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: Novo email do usuário
 *         in: formData
 *         required: true
 *         type: string
 *       - name: senha
 *         description: Nova senha do usuário
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Usuário editado com sucesso
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /usuario/{id}:
 *   delete:
 *     description: Exclui um usuário existente
 *     parameters:
 *       - name: id
 *         description: ID do usuário a ser excluído
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /login:
 *   post:
 *     description: Autentica um usuário
 *     parameters:
 *       - name: userName
 *         description: Nome de usuário
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: Senha do usuário
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /endereco:
 *   post:
 *     description: Adiciona um novo endereço
 *     parameters:
 *       - name: rua
 *         description: Rua do endereço
 *         in: formData
 *         required: true
 *         type: string
 *       - name: predio
 *         description: Prédio do endereço
 *         in: formData
 *         required: true
 *         type: string
 *       - name: andar
 *         description: Andar do endereço
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: apartamento
 *         description: Apartamento do endereço
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: local_id
 *         description: ID do local associado ao endereço
 *         in: formData
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Novo endereço inserido com sucesso
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /endereco:
 *   get:
 *     description: Obtém todos os endereços
 *     responses:
 *       200:
 *         description: Lista de endereços obtida com sucesso
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /endereco/{id}:
 *   put:
 *     description: Edita um endereço existente
 *     parameters:
 *       - name: id
 *         description: ID do endereço a ser editado
 *         in: path
 *         required: true
 *         type: integer
 *       - name: rua
 *         description: Nova rua do endereço
 *         in: formData
 *         required: true
 *         type: string
 *       - name: predio
 *         description: Novo prédio do endereço
 *         in: formData
 *         required: true
 *         type: string
 *       - name: andar
 *         description: Novo andar do endereço
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: apartamento
 *         description: Novo apartamento do endereço
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: local_id
 *         description: Novo ID do local associado ao endereço
 *         in: formData
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Endereço editado com sucesso
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /endereco/{id}:
 *   delete:
 *     description: Exclui um endereço existente
 *     parameters:
 *       - name: id
 *         description: ID do endereço a ser excluído
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Endereço excluído com sucesso
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /local:
 *   post:
 *     description: Adiciona um novo local
 *     parameters:
 *       - name: nome
 *         description: Nome do local
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Novo local inserido com sucesso
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /local:
 *   get:
 *     description: Obtém todos os locais
 *     responses:
 *       200:
 *         description: Lista de locais obtida com sucesso
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /local/{id}:
 *   put:
 *     description: Edita um local existente
 *     parameters:
 *       - name: id
 *         description: ID do local a ser editado
 *         in: path
 *         required: true
 *         type: integer
 *       - name: nome
 *         description: Novo nome do local
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Local editado com sucesso
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /local/{id}:
 *   delete:
 *     description: Exclui um local existente
 *     parameters:
 *       - name: id
 *         description: ID do local a ser excluído
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Local excluído com sucesso
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /produto:
 *   post:
 *     description: Adiciona um novo produto
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: imagem
 *         description: Imagem do produto
 *         in: formData
 *         required: true
 *         type: file
 *       - name: nome
 *         description: Nome do produto
 *         in: formData
 *         required: true
 *         type: string
 *       - name: descricao
 *         description: Descrição do produto
 *         in: formData
 *         required: true
 *         type: string
 *       - name: codigo_barras
 *         description: Código de barras do produto
 *         in: formData
 *         required: true
 *         type: string
 *       - name: local_id
 *         description: ID do local associado ao produto
 *         in: formData
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Novo produto inserido com sucesso
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /produto:
 *   get:
 *     description: Obtém todos os produtos
 *     responses:
 *       200:
 *         description: Lista de produtos obtida com sucesso
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /produto/{id}:
 *   put:
 *     description: Edita um produto existente
 *     parameters:
 *       - name: id
 *         description: ID do produto a ser editado
 *         in: path
 *         required: true
 *         type: integer
 *       - name: imagem
 *         description: Nova imagem do produto
 *         in: formData
 *         required: true
 *         type: file
 *       - name: nome
 *         description: Novo nome do produto
 *         in: formData
 *         required: true
 *         type: string
 *       - name: codigo_barras
 *         description: Novo código de barras do produto
 *         in: formData
 *         required: true
 *         type: string
 *       - name: local_id
 *         description: Novo ID do local associado ao produto
 *         in: formData
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Produto editado com sucesso
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /produto/{id}:
 *   delete:
 *     description: Exclui um produto existente
 *     parameters:
 *       - name: id
 *         description: ID do produto a ser excluído
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Produto excluído com sucesso
 *       500:
 *         description: Erro interno do servidor
 */

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
  const { rua, predio, andar, apartamento, local_id } = req.body;
  const SQL =
    "INSERT INTO endereco (rua, predio, andar, apartamento, local_id) VALUES (?, ?, ?, ?, ?)";
  db.query(SQL, [rua, predio, andar, apartamento, local_id], (err, result) => {
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
  const SQL = "SELECT id,rua,predio,andar,apartamento,local_id FROM endereco";
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
  const { rua, predio, andar, apartamento, local_id } = req.body;
  const { id } = req.params;
  const SQL =
    "UPDATE endereco SET rua = ?, predio = ?, andar = ?, apartamento = ?, local_id = ? WHERE id = ?";
  db.query(
    SQL,
    [rua, predio, andar, apartamento, local_id, id],
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
  const SQL = "SELECT id,nome FROM local";
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

  try {
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
  } catch (err) {
    res.status(400).send({ error: "Erro interno do servidor" });
  }
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
  const { nome, descricao, codigo_barras, local_id, endereco_id } = req.body;
  const nomeImagem = req.file.filename; // Nome do arquivo enviado pelo multer
  const SQL =
    "INSERT INTO produto (nome, descricao, codigo_barras, local_id, endereco_id, imagem) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    SQL,
    [nome, descricao, codigo_barras, local_id, endereco_id, nomeImagem],
    (err, result) => {
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
    produto.imagem  ,  
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
  const { nome, descricao, codigo_barras, local_id, endereco_id } = req.body;
  const { id } = req.params;
  const SQL =
    "UPDATE produto SET nome = ?, descricao = ?, codigo_barras = ?, local_id = ?, endereco_id = ? WHERE id = ?";
  db.query(
    SQL,
    [nome, descricao, codigo_barras, local_id, endereco_id, id],
    (err, result) => {
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
