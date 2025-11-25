import { Request, Response } from "express";
import { z } from "zod";
import { taskService } from "../services/task.service";

const taskCreateSchema = z.object({
  title: z.string().min(1),
  status: z.enum(["pending", "in_progress", "done"]),
  priority: z.enum(["low", "medium", "high"]),
  assigneeId: z.number().int(),
});

const taskUpdateSchema = taskCreateSchema.partial();

export const getTasks = async (req: Request, res: Response) => {
  const { status, priority } = req.query;

  const filters: any = {};
  if (status) filters.status = status;
  if (priority) filters.priority = priority;

  const tasks = await taskService.getAll(filters);
  res.json(tasks);
};

export const getTaskById = async (req: Request, res: Response) => {
  const task = await taskService.getById(Number(req.params.id));
  if (!task) return res.status(404).json({ message: "Task not found" });

  res.json(task);
};

export const createTask = async (req: Request, res: Response) => {
  const parsed = taskCreateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json(parsed.error);
  }

  const task = await taskService.create(parsed.data);
  res.status(201).json(task);
};

export const updateTask = async (req: Request, res: Response) => {
  const parsed = taskUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json(parsed.error);
  }

  const updated = await taskService.update(Number(req.params.id), parsed.data);
  if (!updated) return res.status(404).json({ message: "Task not found" });

  res.json(updated);
};

export const deleteTask = async (req: Request, res: Response) => {
  const ok = await taskService.delete(Number(req.params.id));
  if (!ok) return res.status(404).json({ message: "Task not found" });

  res.status(204).send();
};
