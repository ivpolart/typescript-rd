import { Request, Response } from "express";
import { taskService } from "../services/task.service";
import { taskCreateSchema, taskUpdateSchema, taskQuerySchema } from "../validators/task.validator";

export const getTasks = (req: Request, res: Response) => {
  const parsed = taskQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json(parsed.error);
  }

  const tasks = taskService.getTasks(parsed.data);
  res.json(tasks);
};

export const getTaskById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const task = taskService.getTaskById(id);

  if (!task) return res.status(404).json({ message: "Task not found" });

  res.json(task);
};

export const createTask = (req: Request, res: Response) => {
  const parsed = taskCreateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json(parsed.error);
  }

  const task = taskService.createTask(parsed.data);
  res.status(201).json(task);
};

export const updateTask = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const parsed = taskUpdateSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json(parsed.error);
  }

  const updated = taskService.updateTask(id, parsed.data);
  if (!updated) return res.status(404).json({ message: "Task not found" });

  res.json(updated);
};

export const deleteTask = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const ok = taskService.deleteTask(id);

  if (!ok) return res.status(404).json({ message: "Task not found" });

  res.status(204).send();
};
