import sequelize from "../config/database.js";
import { Sequelize } from "sequelize";

const Conversation = sequelize.define("conversation", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
});

export default Conversation;
