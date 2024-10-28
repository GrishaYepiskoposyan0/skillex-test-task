import { Router } from "express";
import { combinationRouter } from "../modules/combination/combination.router.mjs";
export const router = Router();

router.use("/combination", combinationRouter);
