import type { Task } from "../types/task";
import StatusBadge from "./StatusBadge";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

function TaskCard({ task, onDelete, onEdit }: TaskCardProps) {
  return (
    <article className="task-card">
      <div className="task-card-header">
        <h3>{task.title}</h3>
        <StatusBadge status={task.status} />
      </div>

      <p>{task.description}</p>

      <div className="task-card-footer">
        <small>
          Created: {new Date(task.createdAt).toLocaleDateString()}
        </small>

        <div className="task-actions">
          <button onClick={() => onEdit(task)}>
            Edit
          </button>

          <button
            className="delete-button"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default TaskCard;