import { type FormEvent, useEffect, useState } from "react";
import { createTask, updateTask } from "../services/taskApi";
import type { Task, TaskStatus } from "../types/task";

interface TaskFormProps {
  editingTask: Task | null;
  onTaskSaved: () => void;
  onCancelEdit: () => void;
}

function TaskForm({
  editingTask,
  onTaskSaved,
  onCancelEdit,
}: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("TO_DO");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setStatus(editingTask.status);
    } else {
      setTitle("");
      setDescription("");
      setStatus("TO_DO");
    }

    setError("");
  }, [editingTask]);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setSubmitting(true);

    try {
      const taskData = {
        title: title.trim(),
        description: description.trim(),
        status,
      };

      if (editingTask) {
        await updateTask(editingTask.id, taskData);
      } else {
        await createTask(taskData);
      }

      onTaskSaved();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to save task"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>

        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          placeholder="Enter task title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>

        <textarea
          id="description"
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
          placeholder="Enter task description"
          rows={4}
        />
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>

        <select
          id="status"
          value={status}
          onChange={(event) =>
            setStatus(event.target.value as TaskStatus)
          }
        >
          <option value="TO_DO">To Do</option>
          <option value="IN_PROGRESS">
            In Progress
          </option>
          <option value="COMPLETE">Complete</option>
        </select>
      </div>

      {error && (
        <p className="form-error">
          {error}
        </p>
      )}

      <div className="form-actions">
        <button type="submit" disabled={submitting}>
          {submitting
            ? "Saving..."
            : editingTask
              ? "Update Task"
              : "Create Task"}
        </button>

        {editingTask && (
          <button
            type="button"
            onClick={onCancelEdit}
            disabled={submitting}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;