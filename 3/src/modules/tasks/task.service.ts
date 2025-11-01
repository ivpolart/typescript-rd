import { Task, Status, Priority, statusDefault, priorityDefault } from './task.types';

export class TaskService {
    private tasks: Task[] = [];
    
    createNewTask(
        title: string,
        description: string,
        createdAt: string,
        status: Status = statusDefault,
        priority: Priority = priorityDefault,
        deadline: string
    ): Task {
        const newTask = new Task(
            this.tasks.length + 1,
            title,
            description,
            createdAt,
            status,
            priority,
            deadline
        );

        this.tasks.push(newTask)

        return newTask;
    }

    updateTask(
        id: number,
        title: string,
        description: string,
        createdAt: string,
        status: Status = statusDefault,
        priority: Priority = priorityDefault,
        deadline: string
    ): Task[] | string {
        const currentTask = this.tasks.find(task => (task.id == id));
        if (!currentTask) {
            return "Task not found";
        }

        currentTask.title = title;
        currentTask.description = description;
        currentTask.createdAt = createdAt;
        currentTask.status = status;
        currentTask.priority = priority;
        currentTask.deadline = deadline;

        return this.tasks;
    }

    deleteTask(id: number): Task[] | string {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index === -1) {
            return "Task not found"
        };
        this.tasks.splice(index, 1);
        return this.tasks;
    }

    filterByStatus(status: Status): Task[] {
        return this.tasks.filter(task => task.status === status);
    }

    filterByPriority(priority: Priority): Task[] {
        return this.tasks.filter(task => task.priority === priority);
    }

    filterByCreatedAt(date: string): Task[] {
        const filterDate = new Date(date);
        return this.tasks.filter(task => new Date(task.createdAt) >= filterDate);
    }

    isTaskOnTime(task: Task): boolean {
        const deadlineDate = new Date(task.deadline);
        const now = new Date();
        return now <= deadlineDate;
    }


    checkTaskDeadline(id: number): string {
        const task = this.tasks.find(t => t.id === id);
        if (!task) {
            return "Task not found"
        };
        return this.isTaskOnTime(task) ? "On time" : "Deadline passed";
    }

    getAllTasks(): Task[] {
        return this.tasks;
    }
}