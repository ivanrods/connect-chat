import { useState } from "react";
import { Box, Typography } from "@mui/material";

import { useUser } from "../hooks/use-profile";
import { useConversations } from "../hooks/use-conversations";
import { useMessages } from "../hooks/use-messages";
import { useConversationSocket } from "../hooks/use-conversation-socket";

import { Sidebar } from "../components/Sidebar";
import { MessageInput } from "../components/MessageInput";
import { useSendMessage } from "../hooks/use-send-message";

export default function Chat() {
  const { user } = useUser();

  const { conversations, loading: loadingConversations } = useConversations();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const { sendMessage } = useSendMessage();

  const {
    messages,
    setMessages,
    loading: loadingMessages,
  } = useMessages(selectedConversation?.id);

  // 🔌 Socket da conversa
  useConversationSocket({
    conversationId: selectedConversation?.id,
    setMessages,
  });

  return (
    <Box display="flex" height="100vh">
      {/* LISTA DE CONVERSAS */}
      <Box width={320} borderRight="1px solid #ddd">
        <Sidebar
          conversations={conversations}
          loading={loadingConversations}
          selectedConversation={selectedConversation}
          onSelect={setSelectedConversation}
        />
      </Box>

      {/* ÁREA DO CHAT */}
      <Box flex={1} display="flex" flexDirection="column">
        {!selectedConversation ? (
          <Box
            flex={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography color="text.secondary">
              Selecione uma conversa
            </Typography>
          </Box>
        ) : (
          <>
            <ChatHeader
              conversation={selectedConversation}
              userId={user.id}
              onMenuClick={() => setSidebarOpen(true)}
            />
            <MessageList
              messages={messages}
              loading={loadingMessages}
              user={user}
            />
            <MessageInput
              disabled={!selectedConversation}
              onSend={(content) =>
                sendMessage(selectedConversation.id, content)
              }
            />
          </>
        )}
      </Box>
    </Box>
  );
}
