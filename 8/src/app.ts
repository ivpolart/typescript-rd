import * as dotenv from "dotenv";
import taskRoutes from "./routes/task.routes";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import db from "./config/database";

dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` });

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/tasks", taskRoutes);

async function main() {
  await db.sync({ alter: true });
  console.log("DB synced");
}

main();

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

export default app;
