import { useEffect, useState } from 'react';
import { TasksList } from "../api";
import type { Task } from '../types';
import TasksListView from "../components/TasksListView";

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    TasksList()
      .then((result) => {
        setTasks(result || []);
        setError(null);
      })
      .catch(() => {
        setError("Failed to load tasks. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <TasksListView
      tasks={tasks}
      error={error}
      loading={loading}
    />
  );
};

export default Tasks;
