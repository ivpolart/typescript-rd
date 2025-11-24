import { z } from "zod";

export const taskCreateSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  createdAt: z.string(),
  status: z.enum(["todo", "in_progress", "done"]),
  priority: z.enum(["low", "medium", "high"]),
  deadline: z.string(),
});

export const taskUpdateSchema = taskCreateSchema.partial();

export const taskQuerySchema = z.object({
  createdAt: z.string().optional(),
  status: z.enum(["todo", "in_progress", "done"]).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
});
