export type Status = "todo" | "in_progress" | "done";
export type Priority = "low" | "medium" | "high";

export const statusDefault: Status = "todo";
export const priorityDefault: Priority = "medium";

export class Task {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public createdAt: string | Date,
    public status: Status = statusDefault,
    public priority: Priority = priorityDefault,
    public deadline: string | Date
  ) {
    if (!title.trim()) throw new Error("Title cannot be empty");
    if (isNaN(Date.parse(createdAt.toString()))) throw new Error("Invalid createdAt date");
    if (isNaN(Date.parse(deadline.toString()))) throw new Error("Invalid deadline date");
  }

  getTaskInfo(): string {
    return `Title: ${this.title}, Status: ${this.status}, Priority: ${this.priority}`;
  }
}

export class Subtask extends Task {
  constructor(
    id: number,
    title: string,
    description: string,
    createdAt: string | Date,
    status: Status,
    priority: Priority,
    deadline: string | Date,
    public parentId: number
  ) {
    super(id, title, description, createdAt, status, priority, deadline);
  }

  getTaskInfo(): string {
    return `Subtask ${this.title} Parent ID: ${this.parentId}`;
  }
}

export class Bug extends Task {
  constructor(
    id: number,
    title: string,
    description: string,
    createdAt: string | Date,
    status: Status,
    priority: Priority,
    deadline: string | Date,
    public severity: "minor" | "major" | "critical"
  ) {
    super(id, title, description, createdAt, status, priority, deadline);
  }

  getTaskInfo(): string {
    return `Bug ${this.title} Severity: ${this.severity}`;
  }
}

export class Story extends Task {
  constructor(
    id: number,
    title: string,
    description: string,
    createdAt: string | Date,
    status: Status,
    priority: Priority,
    deadline: string | Date,
    public points: number
  ) {
    super(id, title, description, createdAt, status, priority, deadline);
    if (points < 0) throw new Error("Story points cannot be negative");
  }

  getTaskInfo(): string {
    return `Story ${this.title} ${this.points} points`;
  }
}

export class Epic extends Task {
  constructor(
    id: number,
    title: string,
    description: string,
    createdAt: string | Date,
    status: Status,
    priority: Priority,
    deadline: string | Date,
    public storiesCount: number
  ) {
    super(id, title, description, createdAt, status, priority, deadline);
  }

  getTaskInfo(): string {
    return `Epic ${this.title} Stories: ${this.storiesCount}`;
  }
}