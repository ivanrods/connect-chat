import { useState } from "react";
import { usePostChat } from "../hooks/use-chat";
const InputMessage = () => {
  const { postMessage } = usePostChat();

  const [message, setMessage] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    await postMessage(message);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="message"
        id="message"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default InputMessage;
