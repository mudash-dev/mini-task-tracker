import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { deleteTask, getTasks } from "./services/taskApi";
import type { Task } from "./types/task";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      setError("");

      const data = await getTasks();

      setTasks(data);
    } catch (error) {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteTask(id);

      setTasks((currentTasks) =>
        currentTasks.filter(
          (task) => task.id !== id
        )
      );
    } catch (error) {
      setError("Failed to delete task");
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleTaskSaved = async () => {
    setEditingTask(null);
    await loadTasks();
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <main className="container">
      <header className="page-header">
        <h1>Mini Task Tracker</h1>
        <p>Manage your tasks in one place.</p>
      </header>

      <section className="dashboard-section">
        <h2>
          {editingTask
            ? "Edit Task"
            : "Create New Task"}
        </h2>

        <TaskForm
          editingTask={editingTask}
          onTaskSaved={handleTaskSaved}
          onCancelEdit={handleCancelEdit}
        />
      </section>

      <section className="dashboard-section">
        <div className="section-header">
          <h2>Your Tasks</h2>

          <span>
            {tasks.length}{" "}
            {tasks.length === 1
              ? "task"
              : "tasks"}
          </span>
        </div>

        {loading ? (
          <p>Loading tasks...</p>
        ) : error ? (
          <p className="form-error">
            {error}
          </p>
        ) : (
          <TaskList
            tasks={tasks}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
      </section>
    </main>
  );
}

export default App;