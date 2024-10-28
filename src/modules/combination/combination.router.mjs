import { Router } from "express";
import { validationMiddleware } from "../../common/middlewares/validation.middleware.mjs";
import * as combinationValidationSchemas from "./combination.validation-schemas.mjs";
import * as combinationController from "./combination.controller.mjs";

export const combinationRouter = Router();

combinationRouter.post(
  "/generate",
  validationMiddleware(
    combinationValidationSchemas.generateCombinationValidationSchema,
  ),
  combinationController.generateCombination,
);
