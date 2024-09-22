import dotenv from "dotenv";
dotenv.config();

export const config = {
  env: process.env.ENV || "development",
  database: {
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    host: process.env.DB_HOST || "mysql",
    externalHost: process.env.DB_EXTERNAL_HOST || "localhost",
    port: process.env.DB_PORT || "3306",
    database: process.env.DB_NAME || "database",
    batchSize: Number.parseInt(process.env.BATCH_SIZE ?? "1000") || 10000,
  },
  xmlPath: process.env.XML_PATH || "tmp",
};

export const getConfig = <K extends keyof typeof config>(
  key: K,
): (typeof config)[K] => {
  return config[key];
};
