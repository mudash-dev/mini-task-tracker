import type { Task, TaskStatus } from "../types/task";

const API_URL = `${import.meta.env.VITE_API_URL}/tasks`;

export interface TaskData {
  title: string;
  description: string;
  status: TaskStatus;
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(API_URL);

  return handleResponse<Task[]>(response);
};

export const createTask = async (taskData: TaskData): Promise<Task> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  return handleResponse<Task>(response);
};

export const updateTask = async (
  id: string,
  taskData: TaskData,
): Promise<Task> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  return handleResponse<Task>(response);
};

export const deleteTask = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const data = await response.json();

    throw new Error(data.message || "Failed to delete task");
  }
};
