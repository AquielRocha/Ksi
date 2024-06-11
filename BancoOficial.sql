drop database novobanco;

create database novobanco;


USE novobanco;

CREATE TABLE usuario (
  id int(11) NOT NULL AUTO_INCREMENT,
  nome varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  senha varchar(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE local (
  id int(11) NOT NULL AUTO_INCREMENT,
  nome varchar(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE endereco (
  id int(11) NOT NULL AUTO_INCREMENT,
  rua varchar(255) NOT NULL,
  predio varchar(255) DEFAULT NULL,
  andar varchar(50) DEFAULT NULL,
  apartamento varchar(50) DEFAULT NULL,
  usuario_id int(11) DEFAULT NULL,
  local_id int(11) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY usuario_id (usuario_id),
  CONSTRAINT endereco_ibfk_1 FOREIGN KEY (usuario_id) REFERENCES usuario (id),
  CONSTRAINT endereco_ibfk_2 FOREIGN KEY (local_id) REFERENCES local (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE produto (
  id int(11) NOT NULL AUTO_INCREMENT,
  nome varchar(255) NOT NULL,
  descricao varchar(255) NOT NULL,
  codigo_barras varchar(255) NOT NULL,
  local_id int(11) DEFAULT NULL,
  imagem varchar(255) DEFAULT NULL,
  endereco_id int(11) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY local_id (local_id),
  CONSTRAINT produto_ibfk_1 FOREIGN KEY (endereco_id) REFERENCES endereco (id),
  CONSTRAINT produto_ibfk_2 FOREIGN KEY (local_id) REFERENCES local (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE produto_endereco (
  produto_id int(11) DEFAULT NULL,
  endereco_id int(11) DEFAULT NULL,
  KEY produto_id (produto_id),
  KEY endereco_id (endereco_id),
  CONSTRAINT produto_endereco_ibfk_1 FOREIGN KEY (produto_id) REFERENCES produto (id),
  CONSTRAINT produto_endereco_ibfk_2 FOREIGN KEY (endereco_id) REFERENCES endereco (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

