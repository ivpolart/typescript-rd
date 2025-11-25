import type { Task } from './types'

  export async function TaskCreate(task: Omit<Task, "id" | "createdAt">) {
    try {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
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

  export async function TasksList(): Promise<Task[]> {
    const response = await fetch('http://localhost:3000/tasks', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }

    const data: Task[] = await response.json();
    return data;
  }

  export async function fetchTaskDetails(taskId: number): Promise<Task | null> {
    try {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });

        if(!response.ok) {
            throw new Error(`Error HTTP ${response.status}`);
        }

        const data = await response.json();
        console.log('Responce:', data);
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
  }