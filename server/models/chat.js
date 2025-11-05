import sequelize from "../config/database.js";
import { Sequelize } from "sequelize";

const Chat = sequelize.define("chat", {
  user: { type: Sequelize.STRING, allowNull: false },
  message: { type: Sequelize.STRING, allowNull: false },
});
export default Chat;
