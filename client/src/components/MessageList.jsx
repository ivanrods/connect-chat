import { Box, Typography, Paper } from "@mui/material";
import { useEffect, useMemo, useRef } from "react";
import { formatTime, formatDay } from "../utils/format-date";

export function MessageList({ messages, loading, userId }) {
  const messageRef = useRef(null);

  //  Scroll automático
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [messages]);

  //  Agrupar mensagens por data
  const groupedMessages = useMemo(() => {
    const groups = {};

    messages.forEach((msg) => {
      const date = formatDay(msg.createdAt);

      if (!groups[date]) groups[date] = [];
      groups[date].push(msg);
    });

    return groups;
  }, [messages]);

  return (
    <Box
      ref={messageRef}
      flexGrow={1}
      width="100%"
      mx="auto"
      p={2}
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
            textAlign="center"
            color="text.primary"
            mb={1}
          >
            {date}
          </Typography>

          {msgs.map((msg) => {
            const isMe = msg.sender.id === userId;

            return (
              <Box
                key={msg.id}
                alignSelf={isMe ? "flex-end" : "flex-start"}
                display="flex"
                flexDirection="column"
                gap={0.5}
                my={1}
              >
                <Box
                  display="flex"
                  alignItems="flex-end"
                  flexDirection={isMe ? "row-reverse" : "row"}
                  gap={1}
                >
                  {/* Avatar */}
                  <Box
                    component="img"
                    src={msg.sender.avatar}
                    sx={{
                      borderRadius: "50%",
                      width: 30,
                      height: 30,
                    }}
                  />

                  {/* Texto */}
                  {msg.content && (
                    <Paper
                      elevation={0}
                      sx={{
                        bgcolor: isMe ? "primary.main" : "secondary.main",
                        color: isMe ? "text.secondary" : "text.primary",
                        p: 1.5,
                        maxWidth: 500,
                        borderRadius: isMe
                          ? "10px 10px 0px 10px"
                          : "10px 10px 10px 0px",
                      }}
                    >
                      <Typography variant="body1">{msg.content}</Typography>
                    </Paper>
                  )}
                </Box>

                {/* Hora */}
                <Typography
                  variant="caption"
                  color="text.primary"
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
  );
}
