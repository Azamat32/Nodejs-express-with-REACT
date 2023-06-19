import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export default new Sequelize(
  process.env.DB_NAME, // name of the database
  process.env.DB_USER, // name of the user
  process.env.DB_PASSWORD, // password
  {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  }
);
