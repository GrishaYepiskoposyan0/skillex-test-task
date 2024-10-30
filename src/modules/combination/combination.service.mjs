import * as combinationUtils from "../../common/utils/combination.utils.mjs";
import { StatusCodes } from "http-status-codes";
import { mysqlConnectionPool } from "../../common/db/mysql/connection.mjs";

export const generateCombination = async (generateCombinationDto) => {
  const mysqlConnection = await mysqlConnectionPool.getConnection();
  try {
    await mysqlConnection.beginTransaction();

    const validCombinations = combinationUtils.generateCombinations(
      generateCombinationDto.items,
      generateCombinationDto.length,
    );
    const [insertItemResult] = await mysqlConnection.query(
      "INSERT INTO items (item_name) VALUES (?)",
      [JSON.stringify(generateCombinationDto.items)],
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
