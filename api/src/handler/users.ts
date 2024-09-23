import type { UserUseCase } from "@/usecase/user";
import type { RequestHandler } from "express";

export const getUserCreationMonths: RequestHandler = async (req, res) => {
  try {
    const userUseCase: UserUseCase = req.app.locals.userUseCase;
    const months = await userUseCase.getUserCreationMonths();
    res.status(200).json(months);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
