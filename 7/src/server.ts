import express from "express";
import morgan from "morgan";
import cors from "cors";
import taskRoutes from "./routes/task.routes";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/tasks", taskRoutes);

app.use((err: unknown, req: any, res: any, next: any) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
