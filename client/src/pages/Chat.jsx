import { useGetChat } from "../hooks/use-chat";
import { useEffect, useRef, useState } from "react";
import { formatTime, formatDay } from "../utils/format-date";
import Header from "../components/Header";
import InputMessage from "../components/inputMessage";
import { Box, Typography, Paper } from "@mui/material";

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
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      bgcolor="background.default"
    >
      <Header />

      {/* Área de mensagens */}
      <Box
        ref={messageRef}
        flexGrow={1}
        width="100%"
        maxWidth={750}
        mx="auto"
        px={1}
        py={2}
        display="flex"
        flexDirection="column"
        gap={3}
        overflow="auto"
      >
        {loading && (
          <Typography variant="body2" textAlign="center">
            Carregando...
          </Typography>
        )}

        {Object.entries(groupedMessages).map(([date, msgs]) => (
          <Box key={date}>
            {/* Data */}
            <Typography
              variant="body2"
              display="block"
              textAlign="center"
              color="text.secondary"
              mb={1}
            >
              {date}
            </Typography>

            {msgs.map((msg) => {
              const isMe = msg.user === user.email;
              return (
                <Box
                  key={msg.id}
                  alignSelf={isMe ? "flex-end" : "flex-start"}
                  display="flex"
                  flexDirection="column"
                  gap={0.5}
                  my={1}
                >
                  {/* Nome do usuário */}
                  {!isMe && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      alignSelf={isMe ? "flex-end" : "flex-start"}
                    >
                      {msg.user}
                    </Typography>
                  )}
                  <Box
                    display="flex"
                    alignItems="self-end"
                    flexDirection={isMe ? "row-reverse" : "row"}
                    gap={1}
                  >
                    <Box
                      component="img"
                      src={msg.avatar}
                      sx={{
                        borderRadius: "50%",
                        width: 30,
                        height: 30,
                      }}
                    />
                    {/* Texto da mensagem */}
                    {msg.message && (
                      <Paper
                        elevation={3}
                        sx={{
                          bgcolor: isMe ? "primary.main" : "secondary.main",
                          color: "text.primary",
                          p: 1.5,
                          maxWidth: 380,
                          borderRadius: isMe
                            ? "8px 8px 0px 8px"
                            : "8px 8px 8px 0px",
                        }}
                      >
                        <Typography variant="body1">{msg.message}</Typography>
                      </Paper>
                    )}{" "}
                    {/* Anexo */}
                    {msg.file && (
                      <Paper
                        elevation={3}
                        sx={{
                          border: `2px solid ${isMe ? "#1d4ed8" : "#262626"}`,
                          maxWidth: 380,
                          borderRadius: 2,
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={`http://localhost:3333/uploads/${msg.file}`}
                          alt="Anexo"
                          style={{ width: "100%" }}
                        />
                      </Paper>
                    )}
                  </Box>
                  {/* Hora */}
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    alignSelf={isMe ? "flex-end" : "flex-start"}
                  >
                    {formatTime(msg.createdAt)}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        ))}
      </Box>

      <InputMessage />
    </Box>
  );
};

export default Chat;
