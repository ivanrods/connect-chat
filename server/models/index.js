import User from "./user.js";
import Conversation from "./conversation.js";
import Message from "./message.js";
import ConversationUser from "./conversation-user.js";

User.belongsToMany(Conversation, {
  through: ConversationUser,
  foreignKey: "userId",
  otherKey: "conversationId",
});

Conversation.belongsToMany(User, {
  through: ConversationUser,
  foreignKey: "conversationId",
  otherKey: "userId",
});

Conversation.hasMany(ConversationUser, {
  foreignKey: "conversationId",
});
ConversationUser.belongsTo(Conversation, {
  foreignKey: "conversationId",
});

User.hasMany(ConversationUser, {
  foreignKey: "userId",
});
ConversationUser.belongsTo(User, {
  foreignKey: "userId",
});

Conversation.hasMany(Message, {
  foreignKey: "conversationId",
});
Message.belongsTo(Conversation, {
  foreignKey: "conversationId",
});

User.hasMany(Message, {
  foreignKey: "senderId",
  as: "sentMessages",
});
Message.belongsTo(User, {
  foreignKey: "senderId",
  as: "sender",
});
Conversation.hasMany(Message, {
  as: "unreadMessages",
  foreignKey: "conversationId",
});

export { User, Conversation, Message, ConversationUser };
