import { useChat } from "../hooks/use-chat";

const Chat = () => {
  const { messages } = useChat();
  return (
    <div>
      {messages.map((msg) => (
        <p key={messages.id}>
          <span></span> {msg.user} : {msg.message}
        </p>
      ))}
    </div>
  );
};

export default Chat;
