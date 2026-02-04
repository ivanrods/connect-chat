import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Button, LinearProgress } from "@mui/material";

import { useProfile } from "../hooks/use-profile";
import { useConversations } from "../hooks/use-conversations";
import { useMessages, useSendMessage } from "../hooks/use-messages";
import { useConversationSocket } from "../hooks/use-conversation-socket";
import { useUnreadSocket } from "../hooks/use-unread-socket";
import { useFavoriteSocket } from "../hooks/use-favorite-conversation-socket";
import { useFavoriteConversation } from "../hooks/use-favorite-conversation";
import { useConversationsSocket } from "../hooks/use-conversations-socket";

import { CreateConversation } from "../components/CreateConversation";

import { Sidebar } from "../components/Sidebar";
import { MessageInput } from "../components/MessageInput";
import { ChatHeader } from "../components/ChatHeader";
import { MessageList } from "../components/MessageList";
import { useAlert } from "../context/alert-context";
import { EditProfile } from "../components/EditProfile";
import { ImageViewer } from "../components/ImageViewer";

export default function Chat() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [openPofile, setOpenPofile] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const { showAlert } = useAlert();

  const { toggleFavorite } = useFavoriteConversation();

  const {
    user,
    loading: loadingProfile,
    error: errorProfile,
    updateUser,
    uploadAvatar,
    refetchUser,
  } = useProfile();

  const {
    conversations,
    loading: loadingConversations,
    error: errorConversations,
    createConversation,
    updateConversation,
    updateFavorite,
    clearUnread,
    incrementUnread,
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
  const handleConversationUpdate = useCallback(
    ({ lastMessage }) => {
      updateConversation(lastMessage);
    },
    [updateConversation],
  );

  useConversationsSocket(handleConversationUpdate);

  const handleSendMessage = async (content) => {
    await sendMessage(content);
  };

  //Atualizar favoritos
  const handleFavoriteUpdate = useCallback(
    ({ conversationId, favorite }) => {
      updateFavorite({ conversationId, favorite });

      setSelectedConversation((prev) =>
        prev?.id === conversationId
          ? {
              ...prev,
              conversation_users: [{ ...prev.conversation_users[0], favorite }],
            }
          : prev,
      );
    },
    [updateFavorite],
  );

  useFavoriteSocket(handleFavoriteUpdate);

  const handleToggleFavorite = async (conversationId) => {
    await toggleFavorite(conversationId);
  };

  //Mostra menssagens não lidas
  const handleUnread = useCallback(
    ({ conversationId, senderId }) => {
      if (!user?.id) return;
      if (senderId === user.id) return;
      if (selectedConversation?.id === conversationId) return;

      incrementUnread(conversationId);
    },

    [selectedConversation?.id, user?.id, incrementUnread],
  );

  const handleNewMessage = useCallback((newMessage) => {
    setMessages((prev) => [...prev, newMessage]);
  }, []);

  useConversationSocket(selectedConversation?.id, handleNewMessage);

  useUnreadSocket(handleUnread);

  useEffect(() => {
    if (!selectedConversation) return;

    clearUnread(selectedConversation.id);
  }, [selectedConversation, clearUnread]);

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

  //Ver imagem
  const handleOpenImage = (url) => {
    setSelectedImage(url);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
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
          user={user}
          userId={user.id}
          onAddConversation={() => setModalOpen(true)}
          handleProfile={() => setOpenPofile(true)}
        />
        <CreateConversation
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onCreate={createConversation}
        />
        <EditProfile
          open={openPofile}
          onClose={() => setOpenPofile(false)}
          user={user}
          updateProfile={updateUser}
          updateAvatar={uploadAvatar}
          refetchUser={refetchUser}
          loading={loadingProfile}
        />
        <ImageViewer image={selectedImage} onClose={handleCloseImage} />
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
              onOpenImage={handleOpenImage}
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
