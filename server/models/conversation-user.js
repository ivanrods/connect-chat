import sequelize from "../config/database.js";
import { Sequelize } from "sequelize";

const ConversationUser = sequelize.define("conversation_user", {
  role: {
    type: Sequelize.STRING,
    defaultValue: "member",
  },
});

export default ConversationUser;
