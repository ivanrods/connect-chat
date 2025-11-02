import sequelize from "../config/database.js";
import { Sequelize } from "sequelize";

const User = sequelize.define("user", {
  name: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false, unique: true },
  password: { type: Sequelize.STRING, allowNull: false },
});

export default User;
