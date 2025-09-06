import { CheckSquareIcon, SquareIcon } from "@phosphor-icons/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  type Task,
  tasksControllerGetAllTasksQueryKey,
  tasksControllerUpdateTaskDoneMutation,
} from "#/api-client"

interface TaskToggleProps {
  id: Task["id"]
  done: Task["done"]
}

export function TaskToggle({ done, id }: TaskToggleProps) {
  const queryClient = useQueryClient()
  const queryKey = tasksControllerGetAllTasksQueryKey()

  const { mutate: toggleTask, isPending } = useMutation({
    ...tasksControllerUpdateTaskDoneMutation(),
    onError: err => alert(err),
    onSuccess(changedTask) {
      queryClient.setQueryData<Task[]>(queryKey, oldTasks =>
        (oldTasks ?? []).map(t => (t.id === changedTask.id ? changedTask : t)),
      )
    },
  })

  const handleClick = () => {
    toggleTask({
      path: { id },
      body: { done: !done },
    })
  }

  return (
    <button
      type="button"
      className="cursor-pointer"
      disabled={isPending}
      onClick={handleClick}
    >
      {done ? (
        <CheckSquareIcon size={24} weight="fill" />
      ) : (
        <SquareIcon size={24} />
      )}
    </button>
  )
}
