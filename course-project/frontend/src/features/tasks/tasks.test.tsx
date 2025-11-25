import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { renderWithRouter } from "../../test-utils";

import TasksListView from "./components/TasksListView";
import TaskCreate from "./pages/TaskCreate";
import TaskDetailsView from "./components/TasksDetalisView";

//  TESTS FOR TASKS LIST
describe("TasksList UI", () => {
  it("renders tasks correctly", () => {
    const tasks = [
      { id: 1, title: "Learn TS", status: "pending" },
      { id: 2, title: "Write tests", status: "done" },
    ];

    renderWithRouter(<TasksListView tasks={tasks} loading={false} error={null} />);

    expect(screen.getByText("Learn TS")).toBeInTheDocument();
    expect(screen.getByText("Write tests")).toBeInTheDocument();
  });

  it("renders empty state", () => {
    renderWithRouter(<TasksListView tasks={[]} loading={false} error={null} />);

    expect(screen.getByText(/no tasks/i)).toBeInTheDocument();
  });

  it("shows error message", () => {
    renderWithRouter(<TasksListView tasks={[]} loading={false} error="Failed to load" />);

    expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
  });
});

//  TESTS FOR CREATE TASK
describe("TaskCreate form", () => {
  it("submit is disabled when form is empty", () => {
    renderWithRouter(<TaskCreate />);
    const submit = screen.getByRole("button", { name: /create/i });
    expect(submit).toBeDisabled();
  });

  it("submit becomes enabled when form is valid", async () => {
    const user = userEvent.setup();
    renderWithRouter(<TaskCreate />);

    // Title
    await user.type(screen.getByLabelText(/title/i), "My new task");

    // Description
    await user.type(screen.getByLabelText(/description/i), "Some description");

    // Status
    await user.selectOptions(screen.getByLabelText(/status/i), "todo");

    // Priority
    await user.selectOptions(screen.getByLabelText(/priority/i), "low");

    // Deadline
    await user.type(screen.getByLabelText(/deadline/i), "2099-12-31");

    const submit = screen.getByRole("button", { name: /create/i });
    expect(submit).not.toBeDisabled();
  });

  it("shows validation errors", async () => {
    const user = userEvent.setup();
    renderWithRouter(<TaskCreate />);

    const titleInput = screen.getByLabelText(/title/i);

    await user.type(titleInput, "a");
    await user.clear(titleInput);

    expect(screen.getByText(/title is required/i)).toBeInTheDocument();
  });
});

//  TESTS FOR TASK DETAILS
describe("TaskDetails edit mode", () => {
  it("shows initial values from task", () => {
    const task = { id: 1, title: "Old Task", status: "pending" };

    renderWithRouter(<TaskDetailsView task={task} />);

    expect(screen.getByDisplayValue("Old Task")).toBeInTheDocument();
  });
});
