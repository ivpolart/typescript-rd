import db from "../config/database";
import request from "supertest";
import app from "../app";
import { Task } from "../models/Task.model";
import { User } from "../models/User.model";

beforeEach(async () => {
  await db.sync({ force: true });
});

afterAll(async () => {
  await db.close();
});

describe("/tasks API", () => {
  let user: User;

  beforeEach(async () => {
    user = await User.create({ name: "Test User" });
  });

  it("POST /tasks — creates task (201)", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({
        title: "Test task",
        status: "pending",
        priority: "low",
        assigneeId: user.id
      })
      .expect(201);

    expect(res.body).toHaveProperty("id");
    expect(res.body.title).toBe("Test task");
  });

  it("POST /tasks — returns 400 when body is invalid", async () => {
    await request(app)
      .post("/tasks")
      .send({})
      .expect(400);
  });

  it("GET /tasks — returns empty list initially", async () => {
    const res = await request(app).get("/tasks");
    expect(res.body).toHaveLength(0);
  });

  it("GET /tasks — returns created tasks", async () => {
    await Task.create({
      title: "T1",
      status: "pending",
      priority: "low",
      assigneeId: user.id
    });
    await Task.create({
      title: "T2",
      status: "in_progress",
      priority: "high",
      assigneeId: user.id
    });

    const res = await request(app).get("/tasks");
    expect(res.body).toHaveLength(2);
  });

  it("GET /tasks/:id — returns task (200)", async () => {
    const task = await Task.create({
      title: "Single task",
      status: "pending",
      priority: "medium",
      assigneeId: user.id
    });

    const res = await request(app).get(`/tasks/${task.id}`).expect(200);
    expect(res.body.id).toBe(task.id);
    expect(res.body.title).toBe("Single task");
  });

  it("GET /tasks/:id — returns 404 if not found", async () => {
    await request(app).get("/tasks/999").expect(404);
  });

  it("PUT /tasks/:id — updates task (200)", async () => {
    const task = await Task.create({
      title: "Old",
      status: "pending",
      priority: "low",
      assigneeId: user.id
    });

    const res = await request(app)
      .put(`/tasks/${task.id}`)
      .send({ title: "Updated" })
      .expect(200);

    expect(res.body.title).toBe("Updated");
  });

  it("PUT /tasks/:id — returns 404 for invalid id", async () => {
    await request(app)
      .put("/tasks/999")
      .send({ title: "any" })
      .expect(404);
  });

  it("DELETE /tasks/:id — deletes task (200)", async () => {
    const task = await Task.create({
        title: "Remove me",
        status: "pending",
        priority: "low",
        assigneeId: user.id
    });

    await request(app).delete(`/tasks/${task.id}`).expect(204);

    const res = await request(app).get("/tasks");
    expect(res.body).toHaveLength(0);
  });


  it("DELETE /tasks/:id — returns 404 if missing", async () => {
    await request(app).delete("/tasks/999").expect(404);
  });
});
