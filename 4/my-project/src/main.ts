import './style.css'
import { createTask, updateTask, showTaskDetails, deleteTask, showListTasks, type Status, type Priority, type Task } from './api.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="container">
    <div class="task-list-block">
      <div class="title-holder">
        <h2>Tasks</h2>
      </div>
      <ul id="task-list"></ul>
    </div>
    <div class="form-block">
      <div class="title-holder">
        <h2>Create new task</h2>
      </div>
      <form id="task-form">
        <fieldset class="field">
          <label for="taskName">Name</label>
          <input type="text" name="taskName">
        </fieldset>
        <fieldset class="field">
          <label for="description">Description</label>
          <input type="text" name="description">
        </fieldset>
        <fieldset class="field">
          <label for="status">Status</label>
          <select name="status">
            <option value="todo">To do</option>
            <option value="in_progress">In progress</option>
            <option value="done">Done</option>
          </select>
        </fieldset>
        <fieldset class="field">
          <label for="priority">Priority</label>
          <select name="priority">
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </fieldset>
        <fieldset class="field">
          <label for="date">Deadline</label>
          <input type="date" name="deadline">
        </fieldset>
      </form>
    </div>
  </div>
`

const form = document.querySelector<HTMLFormElement>('#task-form');
const list = document.querySelector<HTMLUListElement>('#task-list');

showListTasks();

form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const task = {
     title: formData.get('taskName') as string,
     description: formData.get('description') as string,
     status: formData.get('status') as Status,
     priority: formData.get('priority') as Priority,
     deadline: formData.get('deadline') as string,
     createdAt: new Date().toISOString(),
  };

  await createTask(task);
  await showListTasks();
  form.reset();
});
