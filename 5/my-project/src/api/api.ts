export type Status = "todo" | "in_progress" | "done";
export type Priority = "low" | "medium" | "high";

export type Task = {
  id: number;
  title: string;
  description: string;
  createdAt: string | Date;
  status: Status;
  priority: Priority;
  deadline: string | Date;
};

export async function createTask(task: Omit<Task, "id" | "createdAt">) {
  try {
    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...task,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      })
    });

    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log("Task created:", data);
    return data;
  } catch (error) {
    console.error("Error creating task:", error);
  }
}