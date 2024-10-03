import { getConfig } from "@/config";
import mysql from "mysql2/promise";

const NewMySQL = async () => {
  const database = getConfig("database");
  const connection = await mysql.createConnection({
    host: database.externalHost,
    user: database.user,
    password: database.password,
    database: database.database,
  });
  return connection;
};

export const MySQLSingleton = {
  instance: null as mysql.Connection | null,
  async getInstance(): Promise<mysql.Connection> {
    if (!this.instance) {
      this.instance = await NewMySQL();
    }
    return this.instance;
  },
  async end(): Promise<void> {
    if (this.instance) {
      await this.instance.end();
    }
  },
};
