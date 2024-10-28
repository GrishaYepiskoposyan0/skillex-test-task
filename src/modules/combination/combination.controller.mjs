import { StatusCodes } from "http-status-codes";
import * as combinationService from "./combination.service.mjs";

export const generateCombination = async (req, res) => {
  try {
    const { code, ...result } = await combinationService.generateCombination(
      req.body,
    );
    res.status(code).json(result);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};
