import dotenv from "dotenv";
import mysql from "mysql2/promise";
dotenv.config();

const NewMySQL = (async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_EXTERNAL_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  return connection;
})();

export const MySQLSingleton = {
  instance: null as mysql.Connection | null,
  async getInstance(): Promise<mysql.Connection> {
    if (!this.instance) {
      this.instance = await NewMySQL;
    }
    return this.instance;
  },
  async end(): Promise<void> {
    if (this.instance) {
      await this.instance.end();
    }
  },
};
