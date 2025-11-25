import dotenv from "dotenv"
import { Dialect } from "sequelize"
import { Sequelize } from "sequelize-typescript"
import { Task } from "../models/Task.model";
import { User } from "../models/User.model";

// Load correct env file before exporting config:
dotenv.config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
})

interface DBConfig {
  [key: string]: {
    username?: string
    password?: string
    database?: string
    host?: string
    dialect: Dialect
    storage?: string
    logging?: boolean
  }
}

const config: DBConfig = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
  test: {
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  },
}
const db = new Sequelize({
  ...config[process.env.NODE_ENV || "development"],
  models: [Task, User],
});

export default db