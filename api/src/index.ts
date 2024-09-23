import { getConfig } from "@/config";
import { WinstonLogger } from "@/infra/logger/winston";
import { MySQLSingleton } from "@/repository/mysql/core";
import { TranslationMySQL } from "@/repository/mysql/translation";
import { UserRepositoryMySQL } from "@/repository/mysql/user";
import { router } from "@/router";
import { UserUseCase } from "@/usecase/user";
import cors from "cors";
import express from "express";

interface AppLocals {
  userUseCase: UserUseCase;
}

declare module "express" {
  export interface Application {
    locals: AppLocals;
  }
}

(async () => {
  const app = express();
  app.use(cors());
  const PORT = getConfig("api").port;

  const logger = new WinstonLogger();
  try {
    const db = await MySQLSingleton.getInstance();
    const translation = new TranslationMySQL(db);
    const userRepository = new UserRepositoryMySQL(db);
    const userUseCase = new UserUseCase(logger, translation, userRepository);

    app.locals.logger = logger;
    app.locals.userUseCase = userUseCase;

    app.use("/api", router);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(err);
    logger.error(err);
  }
})();
