import { useEffect, useRef, useState } from "react";
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
import { useAlert } from "../context/alert-context";
import { useFavoriteConversation } from "../hooks/use-favorite-conversation";

export default function Chat() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const { showAlert } = useAlert();
  const { toggleFavorite } = useFavoriteConversation();

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

  const handleToggleFavorite = async (conversationId) => {
    try {
      await toggleFavorite(conversationId);
    } catch (err) {
      console.error(err);
    }
  };

  //Mostra aleta de erros
  const shownErrorRef = useRef(null);

  useEffect(() => {
    const firstError = [
      errorConversations,
      errorMessages,
      errorSendMessage,
      errorProfile,
    ].find(Boolean);

    if (!firstError) return;
    if (shownErrorRef.current === firstError) return;

    shownErrorRef.current = firstError;
    showAlert(firstError, "error");
  }, [
    errorConversations,
    errorMessages,
    errorSendMessage,
    errorProfile,
    showAlert,
  ]);

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
          user={user}
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
              onToggleFavorite={handleToggleFavorite}
            />
            <MessageList
              messages={messages}
              loading={loadingMessages}
              userId={user.id}
            />

            <MessageInput
              disabled={!selectedConversation}
              onSend={handleSendMessage}
              loading={loadingSendMessage}
            />
          </>
        )}
      </Box>
    </Box>
  );
}
