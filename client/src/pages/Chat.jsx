import { useGetChat } from "../hooks/use-chat";
import { useEffect, useRef, useState } from "react";
import { formatTime, formatDay } from "../utils/format-date";
import Header from "../components/Header";
import InputMessage from "../components/inputMessage";
import styles from "../styles/Chat.module.css";

const Chat = () => {
  const [page] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [user, setUser] = useState({});

  const { messages, loading } = useGetChat(page, limit);
  const messageRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  //agrupar mensagens por data
  const groupedMessages = messages.reduce((acc, msg) => {
    const date = formatDay(msg.createdAt);

    if (!acc[date]) acc[date] = [];
    acc[date].push(msg);

    return acc;
  }, {});

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  return (
    <div className={styles.chat}>
      <Header />
      <div className={styles.message} ref={messageRef}>
        {loading && <p className={styles.loading}>Carregando...</p>}

        {Object.entries(groupedMessages).map(([date, msgs]) => (
          <div key={date}>
            <div className={styles.line}>
              <h4>{date}</h4>
            </div>

            {msgs.map((msg) => (
              <section
                key={msg.id}
                className={msg.user === user.email ? styles.me_msg : styles.msg}
              >
                <small>{msg.user}</small>
                <div>
                  {msg.message !== "" && <p>{msg.message}</p>}

                  {msg.file && (
                    <div
                      className={
                        msg.user === user.email ? styles.me_file : styles.file
                      }
                    >
                      <img
                        src={`http://localhost:3333/uploads/${msg.file}`}
                        alt="Anexo"
                      />
                    </div>
                  )}
                  <span>{formatTime(msg.createdAt)}</span>
                </div>
              </section>
            ))}
          </div>
        ))}
      </div>
      <InputMessage />
    </div>
  );
};

export default Chat;
