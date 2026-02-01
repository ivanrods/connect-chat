import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define("user", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: DataTypes.STRING,
  avatar: DataTypes.STRING,
  avatarPublicId: {
    type: DataTypes.STRING,
  },
});

export default User;
