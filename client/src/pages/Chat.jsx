import { useState } from "react";
import { useGetChat, usePostChat } from "../hooks/use-chat";
import { useAuth } from "../context/auth-context";
import { formatDate } from "../utils/format-date";

const Chat = () => {
  const { messages } = useGetChat();
  const { postMessage } = usePostChat();
  const { signOut } = useAuth();

  const [message, setMessage] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    await postMessage(message);
  }

  return (
    <>
      <button type="button" onClick={signOut}>
        Sair
      </button>
      <div>
        {messages.map((msg) => (
          <div key={msg.id}>
            <span> {formatDate(msg.createdAt)}</span>

            <p>{msg.message}</p>
            <span>{msg.user}</span>
          </div>
        ))}
      </div>
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
    </>
  );
};

export default Chat;
