import User from "./User.js";
import Conversation from "./Conversation.js";
import Message from "./Message.js";
import ConversationUser from "./ConversationUser.js";

User.belongsToMany(Conversation, { through: ConversationUser });
Conversation.belongsToMany(User, { through: ConversationUser });

Conversation.hasMany(Message);
Message.belongsTo(Conversation);

User.hasMany(Message, { as: "sentMessages" });
Message.belongsTo(User, { as: "sender" });

export { User, Conversation, Message, ConversationUser };
