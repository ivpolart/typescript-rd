import { createBrowserRouter } from "react-router-dom";
import TasksList from "./features/tasks/pages/TasksList"
import TaskDetails from "./features/tasks/pages/TaskDetails"
import TaskCreate from "./features/tasks/pages/TaskCreate"

const router = createBrowserRouter([
    {
        path: "/tasks",
        element: <TasksList />
    },
    {
        path: "/tasks/:taskId",
        element: <TaskDetails />
    },
    {
        path: "/tasks/create",
        element: <TaskCreate />
    },
])

export default router