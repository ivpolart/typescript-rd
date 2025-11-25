    import { useParams, Link } from "react-router-dom";
    import { useEffect, useState } from "react";
    import { fetchTaskDetails } from "../api";
    import type { Task } from "../types";

    const TaskDetails = () => {
        const { taskId } = useParams<{taskId: string }>();
        const [task, setTask] = useState<Task | null>(null);

        useEffect(() => {
            if (!taskId) return;
            fetchTaskDetails(Number(taskId)).then((task) => {
                if (task) {
                    setTask(task);
                }
            });
        }, [taskId]);

        if (!task) return <div>Loading...</div>;

        return (
            <div className='tasks_details-container container'>
                <div className="btn-block">
                    <Link className="btn" to="/tasks">Back</Link>
                </div>
                <div className="title-block">
                    <h1>{task.title}</h1>
                </div>
                <div className="task-content">
                    <p>{task.description}</p>
                    <p>Status: {task.status}</p>
                    <p>Priority: {task.priority}</p>
                    <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
                    <p>Created: {new Date(task.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        );
    };

    export default TaskDetails;