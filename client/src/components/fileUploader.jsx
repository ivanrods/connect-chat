import { IconButton } from "@mui/material";
import { useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("nome", "Exemplo");
    formData.append("site", "exemplo.com");
    formData.append("message", "");

    try {
      const response = await fetch(`${apiUrl}/api/chat/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorResponse = await response.text();
        throw new Error(errorResponse || "Erro desconhecido ao enviar arquivo");
      }
    } catch (error) {
      console.error("Erro ao enviar arquivo:", error.message);
    }
  };

  return (
    <label htmlFor="file-upload">
      <input
        id="file-upload"
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <IconButton
        component="span"
        sx={{
          p: 1,
          "& svg": {
            color: "text.secondary",
            width: 22,
            height: 22,
          },
        }}
      >
        Enviar
      </IconButton>
    </label>
  );
};

export default FileUploader;
