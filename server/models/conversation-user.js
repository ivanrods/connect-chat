import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ConversationUser = sequelize.define("conversation_user", {
  role: {
    type: DataTypes.STRING,
    defaultValue: "member",
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default ConversationUser;
