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

    try {
      const response = await fetch("http://localhost:3333/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Upload realizado com sucesso:", result.filename);
      } else {
        console.error("Erro ao enviar arquivo:", result.message);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
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
