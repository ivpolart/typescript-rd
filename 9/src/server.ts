import express from "express";
import morgan from "morgan";
import cors from "cors";
import taskRoutes from "./routes/task.routes";
import db from "./config/database";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/tasks", taskRoutes);

export default app; // <-- важно

// запускаем отдельно
if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => console.log("Server running"));
}
