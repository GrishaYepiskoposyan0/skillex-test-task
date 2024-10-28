import { StatusCodes } from "http-status-codes";

export const validationMiddleware = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (!error) {
      next();
    } else {
      console.error("Validation error:", { error });
      const { details } = error;
      const message = details.map((i) => i.message).join(",");

      res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ success: false, error: message });
    }
  };
};
