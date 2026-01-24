import {
  Box,
  Typography,
  Paper,
  Avatar,
  LinearProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useMemo, useRef } from "react";
import { formatTime, formatDay } from "../utils/format-date";

export function MessageList({ messages, loading, userId }) {
  const messageRef = useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
      py={2}
      px={isMobile ? 2 : 4}
      display="flex"
      flexDirection="column"
      gap={3}
      overflow="auto"
    >
      {loading && <LinearProgress />}

      {Object.entries(groupedMessages).map(([date, msgs]) => (
        <Box key={date}>
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
                my={1}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection={isMe ? "row-reverse" : "row"}
                  gap={1}
                >
                  <Avatar
                    src={msg.sender.avatar}
                    sx={{
                      width: 30,
                      height: 30,
                    }}
                  />

                  {msg.content && (
                    <Paper
                      elevation={0}
                      sx={{
                        bgcolor: isMe ? "primary.main" : "border.main",
                        color: isMe ? "text.secondary" : "text.primary",
                        p: 1.5,
                        maxWidth: isMobile ? "75%" : 600,
                      }}
                    >
                      <Typography variant="body1">{msg.content}</Typography>
                    </Paper>
                  )}
                </Box>

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
