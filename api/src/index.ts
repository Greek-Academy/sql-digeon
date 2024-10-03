import { getConfig } from "@/config";
import { WinstonLogger } from "@/infra/logger/winston";
import { UserRepositoryBigquery } from "@/repository/bigquery/user";
import type { UserRepository } from "@/repository/interface/user";
import { MySQLSingleton } from "@/repository/mysql/core";
import { UserRepositoryMySQL } from "@/repository/mysql/user";
import { router } from "@/router";
import { UserUseCase } from "@/usecase/user";
import { BigQuery } from "@google-cloud/bigquery";
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
    let userRepository = {} as UserRepository;
    if (getConfig("database").type === "bigquery") {
      logger.info("Using BigQuery");
      const bigquery = new BigQuery();
      userRepository = new UserRepositoryBigquery(bigquery);
    } else {
      logger.info("Using MySQL");
      const db = await MySQLSingleton.getInstance();
      userRepository = new UserRepositoryMySQL(db);
    }

    const userUseCase = new UserUseCase(userRepository);

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
