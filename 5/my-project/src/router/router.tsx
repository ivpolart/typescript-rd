import { createBrowserRouter } from "react-router-dom";
import Tasks from "../pages/Tasks"
import TaskDetails from "../pages/TaskDetails"
import CreateTask from "../pages/CreateTask"

const router = createBrowserRouter([
    {
        path: "/tasks",
        element: <Tasks />
    },
    {
        path: "/tasks/:id",
        element: <TaskDetails />
    },
    {
        path: "/tasks/create",
        element: <CreateTask />
    },
])

export default router