import { TaskService } from "./task.service";
import { Task, Subtask, Bug, Story, Epic } from "./task.types";

export class TaskController {
  private service = new TaskService();

  createDemoTasks(): void {
    try {
      const t1 = this.service.createNewTask("Learn TS", "Practice OOP", new Date().toISOString(), "in_progress", "high", "2025-11-20");

      const bug = new Bug(2, "Fix login error", "Button doesn't work", new Date(), "todo", "high", "2025-11-05", "critical");
      const story = new Story(3, "Implement registration", "As a user, I want to sign up", new Date(), "todo", "medium", "2025-11-25", 8);
      const epic = new Epic(4, "User management", "All user-related features", new Date(), "in_progress", "high", "2025-12-15", 3);
      const sub = new Subtask(5, "Design login form", "Create UI mockup", new Date(), "todo", "low", "2025-11-10", 3);

      console.log(t1.getTaskInfo());
      console.log(bug.getTaskInfo());
      console.log(story.getTaskInfo());
      console.log(epic.getTaskInfo());
      console.log(sub.getTaskInfo());
    } catch (e: any) {
      console.error("Error:", e.message);
    }
  }
}
