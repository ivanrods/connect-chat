import { Paperclip } from "lucide-react";
import styles from "../styles/fileUploader.module.css";
import { useState } from "react";

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
      const response = await fetch("http://localhost:3333/upload", {
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
    <label className={styles.uploader}>
      <input type="file" onChange={handleFileChange} />
      <Paperclip />
    </label>
  );
};

export default FileUploader;
