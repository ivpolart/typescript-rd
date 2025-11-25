import { Request, Response } from "express";
import { Task } from "../models/Task.model";
import { User } from "../models/User.model";

export const getTasks = async (req: Request, res: Response) => {
  const tasks = await Task.findAll({ include: [User] });
  res.json(tasks);
};

export const getTaskById = async (req: Request, res: Response) => {
  const task = await Task.findByPk(req.params.id, {
    include: [User],
  });

  if (!task) return res.status(404).json({ message: "Task not found" });

  res.json(task);
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (e) {
    res.status(400).json({ message: "Invalid data", error: e });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  await task.update(req.body);
  res.json(task);
};

export const deleteTask = async (req: Request, res: Response) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  await task.destroy();
  res.status(204).send();
};
