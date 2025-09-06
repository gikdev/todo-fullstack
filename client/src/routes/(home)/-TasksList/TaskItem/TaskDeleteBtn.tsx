import { SpinnerGapIcon, TrashIcon } from "@phosphor-icons/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  type Task,
  tasksControllerGetAllTasksQueryKey,
  tasksControllerRemoveTaskMutation,
} from "#/api-client"

interface TaskDeleteBtnProps {
  taskId: Task["id"]
}

export function TaskDeleteBtn({ taskId }: TaskDeleteBtnProps) {
  const queryClient = useQueryClient()
  const { mutate: removeTask, isPending } = useMutation({
    ...tasksControllerRemoveTaskMutation(),
    onSuccess(removedTask) {
      queryClient.setQueryData<Task[]>(
        tasksControllerGetAllTasksQueryKey(),
        oldTasks => (oldTasks ?? []).filter(t => t.id !== removedTask.id),
      )
    },
    onError: err => alert(err),
  })

  function handleClick() {
    removeTask({ path: { id: taskId } })
  }

  return (
    <button
      type="button"
      aria-label="Delete task"
      disabled={isPending}
      className="text-red-500 hover:text-red-400 size-8 flex items-center justify-center cursor-pointer disabled:opacity-20 disabled:text-zinc-400 disabled:hover:text-zinc-400"
      onClick={handleClick}
    >
      {isPending ? (
        <SpinnerGapIcon size={24} className="animate-spin" />
      ) : (
        <TrashIcon size={24} />
      )}
    </button>
  )
}
