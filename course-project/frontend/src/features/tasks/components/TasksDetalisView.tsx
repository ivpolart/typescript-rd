import type { Task } from "../../tasks/types";

export default function TaskDetailsView({ task }: { task: Task }) {
  return (
    <div>
      <input defaultValue={task.title} />
    </div>
  );
}
