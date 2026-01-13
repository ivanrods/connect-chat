import User from "./user.js";
import Conversation from "./conversation.js";
import Message from "./message.js";
import ConversationUser from "./conversation-user.js";

User.belongsToMany(Conversation, {
  through: ConversationUser,
  foreignKey: "userId",
});

Conversation.belongsToMany(User, {
  through: ConversationUser,
  foreignKey: "conversationId",
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

export { User, Conversation, Message, ConversationUser };
