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

export async function createTask(task: Omit<Task, "id">) {
  try {
    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...task,
        id: Date.now() // генерируем временный id
      })
    });

    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}


export async function updateTask() {
    try {
        const taskId = 1;
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: "Project A",
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque sunt saepe vel atque, minus nemo qui eveniet aliquam itaque eligendi impedit perspiciatis corrupti. Blanditiis esse tempora necessitatibus, vitae obcaecati nam.",
                createdAt: "2025-10-05",
                status: "in_progress",
                priority: "medium",
                deadline: "2025-10-30"
            })
        });

        if(!response.ok) {
            throw new Error(`Error HTTP ${response.status}`);
        }

        const data = await response.json();
        console.log('Responce:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function showTaskDetails() {
    try {
        const taskId = 1;
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(!response.ok) {
            throw new Error(`Error HTTP ${response.status}`);
        }

        const data = await response.json();
        console.log('Responce:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function deleteTask() {
    try {
        const taskId = 1;
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(!response.ok) {
            throw new Error(`Error HTTP ${response.status}`);
        }

        const data = await response.json();
        console.log('Responce:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function showListTasks() {
  try {
    const response = await fetch('http://localhost:3000/tasks', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}`);
    }

    const data: Task[] = await response.json();

    const list = document.querySelector<HTMLUListElement>('#task-list');
    if (!list) return;

    list.innerHTML = '';

    data.forEach(task => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${task.title}</strong><br>
        ${task.description}<br>
        <small>
          Created: ${new Date(task.createdAt).toLocaleDateString()} |
          Status: ${task.status} |
          Priority: ${task.priority} |
          Deadline: ${task.deadline}
        </small>
      `;
      list.appendChild(li);
    });

    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// export { createTask, updateTask, showTaskDetails, deleteTask, showListTasks };