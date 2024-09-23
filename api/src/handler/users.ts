import type { ILogger } from "@/infra/interface/logger";
import type { UserUseCase } from "@/usecase/user";
import type { RequestHandler } from "express";

export const getUserCreationMonths: RequestHandler = async (req, res) => {
  const logger: ILogger = req.app.locals.logger;
  try {
    const userUseCase: UserUseCase = req.app.locals.userUseCase;
    const months = await userUseCase.getUserCreationMonths();
    res.status(200).json(months);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
    } else {
      logger.error(error);
    }
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};
