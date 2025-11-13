import { useGetChat } from "../hooks/use-chat";
import { formatDate } from "../utils/format-date";
import Header from "../components/Header";
import InputMessage from "../components/inputMessage";

const Chat = () => {
  const { messages } = useGetChat();

  return (
    <>
      <Header />
      <div>
        {messages.map((msg) => (
          <div key={msg.id}>
            <span> {formatDate(msg.createdAt)}</span>

            <p>{msg.message}</p>
            <span>{msg.user}</span>
          </div>
        ))}
      </div>
      <InputMessage />
    </>
  );
};

export default Chat;
