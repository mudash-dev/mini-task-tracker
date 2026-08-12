export type TaskStatus = "TO_DO" | "IN_PROGRESS" | "COMPLETE";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
}
