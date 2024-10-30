import express from "express";
import { envConfig } from "./src/common/config/env.config.mjs";
import { router } from "./src/router/index.mjs";
import { handleProcessExit } from "./src/common/handlers/exit.handler.mjs";

const app = express();
const PORT = envConfig.PORT;

/// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/// Router
app.use("/api", router);

/// Handlers
handleProcessExit();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
