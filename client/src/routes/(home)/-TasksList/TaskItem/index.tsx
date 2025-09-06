import type { Task } from "#/api-client"
import { TaskDeleteBtn } from "./TaskDeleteBtn"
import { TaskToggle } from "./TaskToggle"

interface TaskItemProps {
  id: Task["id"]
  title: Task["title"]
  done: Task["done"]
}

export function TaskItem({ done, id, title }: TaskItemProps) {
  return (
    <li className="flex items-center gap-1">
      <TaskToggle id={id} done={done} />
      <span className={`flex-1 ${done ? "line-through" : ""}`}>{title}</span>
      <TaskDeleteBtn taskId={id} />
    </li>
  )
}
