import { mysqlConnection } from "../../common/db/mysql/connection.mjs";
import * as combinationUtils from "../../common/utils/combination.utils.mjs";
import { StatusCodes } from "http-status-codes";

export const generateCombination = async (generateCombinationDto) => {
  try {
    const uppercaseStartingCharCode = 65;
    await mysqlConnection.beginTransaction();

    const combinations = generateCombinationDto.items.reduce(
      (acc, cur, index) => {
        for (let i = 1; i <= cur; i++) {
          acc.push(String.fromCharCode(uppercaseStartingCharCode + index) + i);
        }
        return acc;
      },
      [],
    );
    const validCombinations = combinationUtils.generateCombinations(
      combinations,
      generateCombinationDto.length,
    );
    const [insertItemResult] = await mysqlConnection.query(
      "INSERT INTO items (item_name) VALUES (?)",
      [JSON.stringify(combinations)],
    );
    const itemId = insertItemResult.insertId;

    const [combinationResult] = await mysqlConnection.query(
      "INSERT INTO combinations (combination_items, length, item_id) VALUES (?,?,?)",
      [
        JSON.stringify(validCombinations),
        generateCombinationDto.length,
        itemId,
      ],
    );

    const combinationId = combinationResult.insertId;

    await mysqlConnection.query(
      "INSERT INTO responses (combination_id) VALUES (?)",
      [combinationId],
    );

    await mysqlConnection.commit();

    return {
      code: StatusCodes.CREATED,
      id: combinationId,
      combination: validCombinations,
    };
  } catch (e) {
    await mysqlConnection.rollback();
    return {
      code: StatusCodes.BAD_REQUEST,
      message: e.message,
    };
  }
};
