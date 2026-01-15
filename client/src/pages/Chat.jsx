import { useState } from "react";
import { Box, Typography } from "@mui/material";

import { useUser } from "../hooks/use-profile";
import { useConversations } from "../hooks/use-conversations";
import { useMessages } from "../hooks/use-messages";
import { useConversationSocket } from "../hooks/use-conversation-socket";

import { Sidebar } from "../components/Sidebar";
import { MessageInput } from "../components/MessageInput";
import { useSendMessage } from "../hooks/use-send-message";
import { ChatHeader } from "../components/ChatHeader";
import { MessageList } from "../components/MessageList";

export default function Chat() {
  const { user } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { conversations, loading: loadingConversations } = useConversations();

  const [selectedConversation, setSelectedConversation] = useState(null);

  const {
    messages,
    setMessages,
    loading: loadingMessages,
  } = useMessages(selectedConversation?.id);

  const { sendMessage } = useSendMessage(selectedConversation?.id);

  // Socket em tempo real
  useConversationSocket(selectedConversation?.id, (newMessage) => {
    setMessages((prev) => [...prev, newMessage]);
  });

  const handleSendMessage = async (content) => {
    await sendMessage(content);
  };

  return (
    <Box display="flex" height="100vh">
      {/* LISTA DE CONVERSAS */}
      <Box width={320} borderRight="1px solid #ddd">
        <Sidebar
          open={open}
          onClose={false}
          conversations={conversations}
          loading={loadingConversations}
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
          userId="64a6db8e-cb84-49bf-b68f-ae2598e90dc5"
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
              userId="64a6db8e-cb84-49bf-b68f-ae2598e90dc5"
              onMenuClick={() => setSidebarOpen(true)}
            />
            <MessageList
              messages={messages}
              loading={loadingMessages}
              user={user}
            />

            <MessageInput
              disabled={!selectedConversation}
              onSend={handleSendMessage}
            />
          </>
        )}
      </Box>
    </Box>
  );
}
