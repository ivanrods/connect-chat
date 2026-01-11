import sequelize from "../config/database.js";
import { Sequelize } from "sequelize";

const Message = sequelize.define("message", {
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

export default Message;
