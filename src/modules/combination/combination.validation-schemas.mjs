import Joi from "joi";
import { envConfig } from "../../common/config/env.config.mjs";

export const generateCombinationValidationSchema = Joi.object()
  .keys({
    items: Joi.array().items(Joi.number().strict().min(0)).min(1).required(),
    length: Joi.number().strict().min(1).required(),
  })
  .custom((value, helpers) => {
    const maxItemsSize = envConfig.MAX_ITEMS_SIZE;
    if (value.items.some((n) => n > 10)) {
      return helpers.message(
        `Combination items cannot be bigger than ${maxItemsSize}.`,
      );
    }
    const maxItemsLength = envConfig.MAX_ITEMS_LENGTH;
    const lettersCount = 26;
    if (
      value.items.length > maxItemsLength ||
      value.items.length > lettersCount
    ) {
      return helpers.message(
        `Combination items length cannot be bigger than ${lettersCount}.`,
      );
    }
    if (value.length > value.items.length) {
      return helpers.message("Length cannot be bigger than items length.");
    }

    return value;
  }, "Combination Length Validation");
