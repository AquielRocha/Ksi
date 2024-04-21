// Rota para obter uma imagem específica por seu nome
app.get("/imagem/:nomeImagem", (req, res) => {
  const nomeImagem = req.params.nomeImagem;
  const imagePath = "./uploads/" + nomeImagem;

  // Verifica se o arquivo de imagem existe
  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("Erro ao acessar a imagem:", err);
      return res.status(404).send("Imagem não encontrada.");
    }

    // Se a imagem existe, envia-a como resposta
    res.sendFile(imagePath);
  });
});
