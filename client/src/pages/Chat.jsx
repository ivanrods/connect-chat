import { useGetChat } from "../hooks/use-chat";
import { useEffect, useRef, useState } from "react";
import { formatDate } from "../utils/format-date";
import Header from "../components/Header";
import InputMessage from "../components/inputMessage";
import styles from "../styles/Chat.module.css";

const Chat = () => {
  const [page] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const { messages, loading } = useGetChat(page, limit);

  const bottomRef = useRef(null);
  const messageRef = useRef(null);
  const [user] = useState("ivan@test.com");

  useEffect(() => {
    const container = messageRef.current;
    if (!container) return;

    const handleScroll = () => {
      const atBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight <
        20;

      setIsAtBottom(atBottom);

      // Scroll infinito no topo
      if (container.scrollTop <= 10) {
        setLimit((prev) => prev + 3);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const container = messageRef.current;
    if (!container) return;

    if (isAtBottom) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={styles.chat}>
      <Header />

      <div className={styles.message} ref={messageRef}>
        {loading && <p className={styles.loading}>Carregando...</p>}

        {messages.map((msg) => (
          <section
            key={msg.id}
            className={msg.user === user ? styles.me_msg : styles.msg}
          >
            <small>{msg.user}</small>
            <div>
              <p>{msg.message}</p>
              <span>{formatDate(msg.createdAt)}</span>
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
