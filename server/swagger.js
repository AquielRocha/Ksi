



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
