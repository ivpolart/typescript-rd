import { Task } from "../types/task.types";

class TaskService {
  private tasks: Task[] = [];
  private currentId = 1;

  getTasks(filters: Partial<Pick<Task, "createdAt" | "status" | "priority">>) {
    let result = [...this.tasks];

    if (filters.createdAt) {
      result = result.filter(t => t.createdAt === filters.createdAt);
    }
    if (filters.status) {
      result = result.filter(t => t.status === filters.status);
    }
    if (filters.priority) {
      result = result.filter(t => t.priority === filters.priority);
    }

    return result;
  }

  getTaskById(id: number) {
    return this.tasks.find(t => t.id === id);
  }

  createTask(data: Omit<Task, "id">) {
    const newTask: Task = {
      id: this.currentId++,
      ...data,
    };

    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id: number, data: Partial<Omit<Task, "id">>) {
    const task = this.getTaskById(id);
    if (!task) return null;

    Object.assign(task, data);
    return task;
  }

  deleteTask(id: number) {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) return false;

    this.tasks.splice(index, 1);
    return true;
  }
}

export const taskService = new TaskService();
