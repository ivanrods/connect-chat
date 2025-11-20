import { useGetChat } from "../hooks/use-chat";
import { useEffect, useRef, useState } from "react";
import { formatDate } from "../utils/format-date";
import Header from "../components/Header";
import InputMessage from "../components/inputMessage";
import styles from "../styles/Chat.module.css";

const Chat = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const { messages } = useGetChat(page, limit);
  const bottomRef = useRef(null);
  const messageRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const container = messageRef.current;
    if (!container) return;

    const handleScroll = () => {
      const isBottom =
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 10;

      if (isBottom) {
        setLimit((prev) => prev + 3);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.chat}>
      <Header />
      <div className={styles.message} ref={messageRef}>
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
