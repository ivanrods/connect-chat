import { useGetChat } from "../hooks/use-chat";
import { useEffect, useRef } from "react";
import { formatDate } from "../utils/format-date";
import Header from "../components/Header";
import InputMessage from "../components/inputMessage";
import styles from "../styles/Chat.module.css";

const Chat = () => {
  const { messages } = useGetChat();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={styles.chat}>
      <Header />
      <div className={styles.message}>
        {messages.map((msg) => (
          <section key={msg.id}>
            <span>{msg.user}</span>
            <div>
              <p>{msg.message}</p>
              <span> {formatDate(msg.createdAt)}</span>
            </div>
          </section>
        ))}
        <div ref={bottomRef} />
      </div>
      <InputMessage />
    </div>
  );
};

export default Chat;
