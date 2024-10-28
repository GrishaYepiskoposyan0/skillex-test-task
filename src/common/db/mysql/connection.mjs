import mysql from "mysql2/promise";
import { envConfig } from "../../config/env.config.mjs";

export const mysqlConnection = await mysql.createConnection(
  envConfig.MYSQL_CONNECTION_CONFIG,
);
