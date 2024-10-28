import { mysqlConnection } from "../db/mysql/connection.mjs";

export const handleProcessExit = () => {
  const events = ["exit", "SIGINT", "SIGUSR1", "SIGUSR2"];
  events.forEach((event) => {
    process.on(event, () => {
      mysqlConnection
        .end()
        .then(() => {
          console.log("The database connection was closed!");
          process.exit();
        })
        .catch((error) => {
          console.log("Error during closing the database connection:", {
            error,
          });
          process.exit();
        });
    });
  });
};
