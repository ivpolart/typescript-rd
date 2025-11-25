import { z } from "zod"
import { Link } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { TaskCreate } from "../api";
import { useNavigate } from "react-router-dom";

const taskSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Field is required"),
    status: z.enum(["todo", "in_progress", "done"]),
    priority: z.enum(["low", "medium", "high"]),
    deadline: z.string()
        .min(1, "Field is required")
        .refine((value) => {
        const today = new Date();
        const date = new Date(value);
        return date >= today;
        }, "Deadline cannot be in the past").regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "Date must be in format YYYY-MM-DD"
        ),
})

type TaskCreateData = z.infer<typeof taskSchema>

const CreateTask = () => {

    const { register, handleSubmit, formState: { isValid, errors} } = useForm<TaskCreateData>({
        mode: "onChange",
        resolver: zodResolver(taskSchema)
    })

    const navigate = useNavigate();
    
    const onSubmit = async (data: TaskCreateData) => {
        await TaskCreate(data);
        navigate("/tasks");
    };

    return (
        <div className="task_create-container container">
            <div className="btn-block">
                <Link className="btn" to="/tasks">Tasks List</Link>
            </div>
            <div className="form-block">
                <div className="title-block">
                    <h2>Create new task</h2>
                </div>
                <form id="task-form" onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className={`field ${errors.title ? "error" : ""}`}>
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        className={errors.title ? "input error" : "input"}
                        type="text"
                        {...register("title")}
                    />
                    <div className="error-message">{errors.title?.message}</div>
                    </fieldset>

                    <fieldset className={`field ${errors.description ? "error" : ""}`}>
                    <label htmlFor="description">Description</label>
                    <input
                        id="description"
                        className={errors.description ? "input error" : "input"}
                        type="text"
                        {...register("description")}
                    />
                    <div className="error-message">{errors.description?.message}</div>
                    </fieldset>
                    <fieldset className="field">
                        <label htmlFor="status">Status</label>
                        <select id="status" {...register("status")}>
                            <option value="todo">To do</option>
                            <option value="in_progress">In progress</option>
                            <option value="done">Done</option>
                        </select>
                    </fieldset>
                    <fieldset className="field">
                        <label htmlFor="priority">Priority</label>
                        <select id="priority" {...register("priority")}>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </fieldset>
                    <fieldset className={`field ${errors.deadline ? "error" : ""}`}>
                    <label htmlFor="deadline">Deadline</label>
                    <input
                        id="deadline"
                        type="text"
                        placeholder="YYYY-MM-DD"
                        {...register("deadline")}
                    />
                    <div className="error-message">{errors.deadline?.message}</div>
                    </fieldset>
                    <fieldset className="field btn-field">
                        <button type="submit" className={`btn ${!isValid ? "disabled" : ""}`} disabled={!isValid}>Create Task</button>
                    </fieldset>
                </form>
            </div>
    </div>
    )
}

export default CreateTask