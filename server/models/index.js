import User from "./user.js";
import Conversation from "./conversation.js";
import Message from "./message.js";
import ConversationUser from "./conversation-user.js";

User.belongsToMany(Conversation, { through: ConversationUser });
Conversation.belongsToMany(User, { through: ConversationUser });

Conversation.hasMany(Message);
Message.belongsTo(Conversation);

User.hasMany(Message, { as: "sentMessages" });
Message.belongsTo(User, { as: "sender" });

export { User, Conversation, Message, ConversationUser };
