import { getUserCreationMonths } from "@/handler/users";
import { Router } from "express";

export const router = Router();
router.get("/users/creation-months", getUserCreationMonths);
