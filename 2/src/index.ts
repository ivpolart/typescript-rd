import { z } from 'zod';
import tasks from '../tasks.json'
import { Task, Status, Priority } from './dto/Task';
import { statusDefault, priorityDefault } from './constants';

const TaskSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  createdAt: z.string().refine(val => !isNaN(Date.parse(val)), "Invalid date"),
  status: z.enum(["todo", "in_progress", "done"]).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  deadline: z.string().refine(val => !isNaN(Date.parse(val)), "Invalid date"),
});

const TasksArraySchema = z.array(TaskSchema);

let tasksList: Task[];
try {
  const parsedTasks = TasksArraySchema.parse(tasks);
  tasksList = parsedTasks.map(task => ({
    ...task,
    status: task.status || statusDefault,
    priority: task.priority || priorityDefault,
  }));
} catch (err) {
  tasksList = [];
}

function getTaskInfo(taskId: number) {
    const taskInfo = tasksList.find(task => (task.id == taskId))
    if(taskInfo) {
        return `
            Title: ${taskInfo.title},
            Description: ${taskInfo.description},
            Create: ${taskInfo.createdAt},
            Status: ${taskInfo.status},
            Priority: ${taskInfo.priority},
            Deadline: ${taskInfo.deadline},
            `;
    } 
    return "Task not found";
}

function createNewTask(
    title: string,
    description: string,
    createdAt: string,
    status: Status = statusDefault,
    priority: Priority = priorityDefault,
    deadline: string) {
    const newTask: Task = {
        id: tasksList.length + 1,
        title,
        description,
        createdAt,
        status,
        priority,
        deadline
    };

    tasksList.push(newTask)

    return newTask;
}

function updateTask(
    id: number,
    title: string,
    description: string,
    createdAt: string,
    status: Status = statusDefault,
    priority: Priority = priorityDefault,
    deadline: string
) {
    const currentTask = tasksList.find(task => (task.id == id));
    if (!currentTask) {
        console.log("Task not found");
        return;
    }

    currentTask.title = title;
    currentTask.description = description;
    currentTask.createdAt = createdAt;
    currentTask.status = status;
    currentTask.priority = priority;
    currentTask.deadline = deadline;

    return tasksList;
}

function deleteTask(id: number) {
  const index = tasksList.findIndex(task => task.id === id);
  if (index === -1) {
    return "Task not found"
  };
  tasksList.splice(index, 1);
  return tasksList;
}


function filterByStatus(status: Status) {
  return tasksList.filter(task => task.status === status);
}

function filterByPriority(priority: Priority) {
  return tasksList.filter(task => task.priority === priority);
}

function filterByCreatedAt(date: string) {
  const filterDate = new Date(date);
  return tasksList.filter(task => new Date(task.createdAt) >= filterDate);
}

function isTaskOnTime(task: Task) {
  const deadlineDate = new Date(task.deadline);
  const now = new Date();
  return now <= deadlineDate;
}

function checkTaskDeadline(id: number) {
  const task = tasksList.find(t => t.id === id);
  if (!task) {
    return "Task not found"
  };
  return isTaskOnTime(task) ? "On time" : "Deadline passed";
}
