import { useState } from "react";
import { usePostChat } from "../hooks/use-chat";
import { Send } from "lucide-react";
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
      <button type="submit">
        <Send />
      </button>
    </form>
  );
};

export default InputMessage;
