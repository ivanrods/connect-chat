import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Message = sequelize.define("message", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  imagePublicId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default Message;
