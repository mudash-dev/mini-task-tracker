import type { TaskStatus } from "../types/task";

interface StatusBadgeProps {
  status: TaskStatus;
}

function StatusBadge({ status }: StatusBadgeProps) {
  const statusLabels = {
    TO_DO: "To Do",
    IN_PROGRESS: "In Progress",
    COMPLETE: "Complete",
  };

  return (
    <span className={`status-badge status-${status.toLowerCase()}`}>
      {statusLabels[status]}
    </span>
  );
}

export default StatusBadge;