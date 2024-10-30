import mysql from "mysql2/promise";
import { envConfig } from "../../config/env.config.mjs";

export const mysqlConnectionPool = mysql.createPool(
  envConfig.MYSQL_CONNECTION_CONFIG,
);
