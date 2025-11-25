import { Link } from "react-router-dom";
import type { Task } from "../types";

type Props = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
};

export default function TasksListView({ tasks, loading, error }: Props) {
  return (
    <div className="tasks-container container">
      <div className="top-block">
        <div className="title-block">
          <h1>Tasks</h1>
        </div>
        <div className="btn-block">
          <Link className="btn" to="/tasks/create">
            Create Task
          </Link>
        </div>
      </div>

      {loading && <p>Loading...</p>}

      {error && <p className="error">{error}</p>}

      {!loading && !error && tasks.length === 0 && (
        <p>No tasks found...</p>
      )}

      {!loading && !error && tasks.length > 0 && (
        <ul className="task-list">
          {tasks.map((task) => (
            <Link key={task.id} to={`/tasks/${task.id}`}>
              <li>
                <strong>{task.title}</strong>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}
