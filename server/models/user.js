import { Sequelize } from "sequelize";
import { sequelize } from "../config/database";

const user = sequelize.define("user", {
  name: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false, unique: true },
  password: { type: Sequelize.STRING, allowNull: false },
});
module.exports = user;
