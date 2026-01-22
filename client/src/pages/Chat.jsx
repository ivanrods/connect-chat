import { useState } from "react";
import { Box, Button, LinearProgress } from "@mui/material";

import { useProfile } from "../hooks/use-profile";
import { useConversations } from "../hooks/use-conversations";
import { useMessages, useSendMessage } from "../hooks/use-messages";
import { useConversationSocket } from "../hooks/use-conversation-socket";

import { Sidebar } from "../components/Sidebar";
import { MessageInput } from "../components/MessageInput";
import { ChatHeader } from "../components/ChatHeader";
import { MessageList } from "../components/MessageList";
import { CreateConversation } from "../components/CreateConversation";

export default function Chat() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);

  const { user, loading: loadingProfile, error: errorProfile } = useProfile();
  const {
    conversations,
    loading: loadingConversations,
    error: errorConversations,
    createConversation,
  } = useConversations();

  const {
    messages,
    setMessages,
    loading: loadingMessages,
    error: errorMessages,
  } = useMessages(selectedConversation?.id);

  const {
    sendMessage,
    loading: loadingSendMessage,
    error: errorSendMessage,
  } = useSendMessage(selectedConversation?.id);

  // Socket em tempo real
  useConversationSocket(selectedConversation?.id, (newMessage) => {
    setMessages((prev) => [...prev, newMessage]);
  });

  const handleSendMessage = async (content) => {
    await sendMessage(content);
  };

  if (loadingProfile) {
    return <LinearProgress />;
  }

  return (
    <Box display="flex" height="100vh">
      <Box>
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          conversations={conversations}
          loading={loadingConversations}
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
          userId={user.id}
          onAddConversation={() => setModalOpen(true)}
        />
        <CreateConversation
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onCreate={createConversation}
        />
      </Box>

      <Box flex={1} display="flex" flexDirection="column">
        {!selectedConversation ? (
          <Box
            flex={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Button variant="text" onClick={() => setSidebarOpen(true)}>
              Selecione uma conversa
            </Button>
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
              userId={user.id}
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
