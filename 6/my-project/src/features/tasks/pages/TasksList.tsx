import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { TasksList } from "../api";
import type { Task } from '../types'

const Tasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState<string | null>(null);
    const taskListData = async () => {
        try {
            const result = await TasksList()
            setTasks(result || []);
            setError(null);
        } catch (err: any) {
            console.error(err);
            setError('Failed to load tasks. Please try again.');
        }
    }
    
    useEffect(() => {
        taskListData()
    }, [])

    if (error) {
        return (
            <div className='tasks-container container'>
                <div className="top-block">
                    <div className="title-block">
                        <h1>Tasks</h1>
                    </div>
                    <div className="btn-block">
                        <Link className='btn' to="/tasks/create">Create Task</Link>
                    </div>
                </div>
                <p className="error">{error}</p>
            </div>
        )
    }

    if (tasks.length === 0) {
        return (
            <>
                <div className='tasks-container container'>
                    <div className="top-block">
                        <div className="title-block">
                            <h1>Tasks</h1>
                        </div>
                        <div className="btn-block">
                            <Link className='btn' to="/tasks/create">Create Task</Link>
                        </div>
                    </div>
                    <p>No tasks found...</p>
                </div>
            </>
        )
    }

    return (
        <>
            <div className='tasks-container container'>
                <div className="top-block">
                    <div className="title-block">
                        <h1>Tasks</h1>
                    </div>
                    <div className="btn-block">
                        <Link className='btn' to="/tasks/create">Create Task</Link>
                    </div>
                </div>
                <ul className="task-list">
                {tasks.map(task => (
                    <Link to={`/tasks/${task.id}`}><li key={task.id}><strong>{task.title}</strong></li></Link>
                ))}
                </ul>
            </div>
        </>
    )    
}

export default Tasks