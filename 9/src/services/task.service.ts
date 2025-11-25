import { Task } from "../models/Task.model";
import { User } from "../models/User.model";

class TaskService {
  async getAll(filters: any) {
    return Task.findAll({
      where: filters,
      include: [User],
    });
  }

  async getById(id: number) {
    return Task.findByPk(id, {
      include: [User],
    });
  }

  async create(data: any) {
    return Task.create(data);
  }

  async update(id: number, data: any) {
    const task = await Task.findByPk(id);
    if (!task) return null;

    await task.update(data);
    return task;
  }

  async delete(id: number) {
    const task = await Task.findByPk(id);
    if (!task) return false;

    await task.destroy();
    return true;
  }
}

export const taskService = new TaskService();
