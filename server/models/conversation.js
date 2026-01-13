import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Conversation = sequelize.define("conversation", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
});

export default Conversation;
