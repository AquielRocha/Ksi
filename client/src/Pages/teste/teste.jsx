import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Selecione um arquivo para fazer upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post("http://localhost:3002/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.imagePath);
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
      setMessage("Erro ao enviar imagem.");
    }
  };

  return (
    <div>.
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Enviar Imagem</button>
      <p>{message}</p>
    </div>
  );
};

export default App;
