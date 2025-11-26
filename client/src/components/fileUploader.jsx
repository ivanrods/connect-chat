import { Paperclip } from "lucide-react";
import styles from "../styles/fileUploader.module.css";
const FileUploader = () => {
  return (
    <label className={styles.uploader}>
      <input
        type="file"
        //ref={fileInputRef}
        //onChange={handleFileChange}
      />

      <Paperclip />
    </label>
  );
};

export default FileUploader;
