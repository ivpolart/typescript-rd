export type Status = "todo" | "in_progress" | "done";
export type Priority = "low" | "medium" | "high";

export type Task = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  status: Status;
  priority: Priority;
  deadline: string;
};
