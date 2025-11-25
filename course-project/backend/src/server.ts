import express from "express";
import morgan from "morgan";
import cors from "cors";
import taskRoutes from "./routes/task.routes";
import db from "./config/database";

const app = express();

async function startServer() {
  try {
    await db.sync();
    console.log("DB synced");

    app.use(cors());
    app.use(morgan("dev"));
    app.use(express.json());

    app.use("/tasks", taskRoutes);

    if (process.env.NODE_ENV !== "test") {
      app.listen(3000, () => console.log("Server running"));
    }
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

startServer();

export default app;
