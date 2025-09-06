import { SpinnerGapIcon } from "@phosphor-icons/react"
import { useQuery } from "@tanstack/react-query"
import { tasksControllerGetAllTasksOptions } from "#/api-client"
import { TaskItem } from "./TaskItem"

export function TasksList() {
  const {
    data: tasks = [],
    isPending,
    isSuccess,
    isError,
    error,
    refetch,
  } = useQuery(tasksControllerGetAllTasksOptions())

  if (isPending)
    return <SpinnerGapIcon className="animate-spin inline-block mx-auto" />

  if (isError)
    return (
      <div>
        <p>Ooops, sth failed.</p>
        <code>{error.message}</code>
        <button type="button" onClick={() => refetch()}>
          [ Retry ]
        </button>
      </div>
    )

  if (isSuccess && tasks.length === 0)
    return <p className="text-center">No tasks yet.</p>

  if (isSuccess && tasks.length > 0)
    return (
      <ul className="flex flex-col">
        {tasks.map(t => (
          <TaskItem key={t.id} {...t} />
        ))}
      </ul>
    )

  return null
}
