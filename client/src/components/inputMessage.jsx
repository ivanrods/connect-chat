import { useState } from "react";
import { usePostChat } from "../hooks/use-chat";
import { Send } from "lucide-react";
import styles from "../styles/inputMessage.module.css";
const InputMessage = () => {
  const { postMessage } = usePostChat();

  const [message, setMessage] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    await postMessage(message);
  }
  return (
    <div className={styles.inputMessage}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="message"
          id="message"
          placeholder="Digite uma mensagem"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button type="submit">
          <Send />
        </button>
      </form>
    </div>
  );
};

export default InputMessage;
