import dotenv from "dotenv";
dotenv.config();

export const envConfig = {
  // App
  PORT: +getEnv("PORT", false) || 3000,
  MAX_ITEMS_LENGTH: +getEnv("MAX_ITEMS_LENGTH", false) || 10,
  MAX_ITEMS_SIZE: +getEnv("MAX_ITEMS_SIZE", false) || 10,
  // DB
  MYSQL_CONNECTION_CONFIG: {
    host: getEnv("MYSQL_CONNECTION_HOST"),
    port: getEnv("MYSQL_CONNECTION_PORT"),
    user: getEnv("MYSQL_CONNECTION_USER"),
    password: getEnv("MYSQL_CONNECTION_PASSWORD"),
    database: getEnv("MYSQL_CONNECTION_DATABASE"),
    connectionLimit: +getEnv("MYSQL_CONNECTION_CONNECTION_LIMIT", false) || 10,
    waitForConnections: true,
    queueLimit: +getEnv("MYSQL_CONNECTION_QUEUE_LIMIT", false) || 0, // 0 means unlimited, but it may cause overwhelming the pool in case of high traffic
  },
};
function getEnv(name, required) {
  const val = process.env[name];
  if ((required && val === undefined) || val === null) {
    throw new Error(`Missing env var for ${name}`);
  }
  return val?.trim();
}
