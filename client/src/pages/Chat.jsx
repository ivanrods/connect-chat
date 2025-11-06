import { useState } from "react";
import { useGetChat, usePostChat } from "../hooks/use-chat";

const Chat = () => {
  const { messages } = useGetChat();
  const { postMessage } = usePostChat();

  const [message, setMessage] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    await postMessage(message);
  }

  return (
    <>
      <div>
        {messages.map((msg) => (
          <p key={msg.id}>
            <span></span> {msg.user} : {msg.message}
          </p>
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
