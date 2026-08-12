import type { Request, Response } from "express";
import { randomUUID } from "crypto";
import { tasks } from "../data/tasks.js";
import type { TaskStatus } from "../types/task.js";

export const getTasks = (_req: Request, res: Response) => {
  res.json(tasks);
};

export const createTask = (req: Request, res: Response) => {
  const { title, description = "", status = "TO_DO" } = req.body;

  const newTask = {
    id: randomUUID(),
    title,
    description,
    status: status as TaskStatus,
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
};

export const updateTask = (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  if (title !== undefined) {
    task.title = title;
  }

  if (description !== undefined) {
    task.description = description;
  }

  if (status !== undefined) {
    task.status = status as TaskStatus;
  }

  res.json(task);
};

export const deleteTask = (req: Request, res: Response) => {
  const { id } = req.params;

  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  tasks.splice(taskIndex, 1);

  res.status(204).send();
};