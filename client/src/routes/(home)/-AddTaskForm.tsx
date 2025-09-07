import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import {
  type TaskDto,
  tasksControllerCreateTaskMutation,
  tasksControllerGetAllTasksQueryKey,
} from "#/api-client"

export function AddTaskForm() {
  const queryClient = useQueryClient()
  const [title, setTitle] = useState("")
  const { mutate: addTask, isPending } = useMutation({
    ...tasksControllerCreateTaskMutation(),
    onSuccess(newlyCreatedTask) {
      setTitle("")
      queryClient.setQueryData<TaskDto[]>(
        tasksControllerGetAllTasksQueryKey(),
        oldTasks => [...(oldTasks ?? []), newlyCreatedTask],
      )
    },
    onError(err) {
      alert(err.message)
    },
  })

  function handleClick() {
    addTask({
      body: { title },
    })
  }

  return (
    <div className="flex gap-1 h-12 w-full">
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="What do u want/need to do?"
        className="
          rounded-s-full rounded-e-sm h-12 flex-1 bg-zinc-800
          px-4 outline-none focus:outline-solid text-zinc-100
          focus:outline-offset-2 focus:outline-2 focus:outline-blue-400
        "
      />

      <button
        type="button"
        disabled={isPending}
        onClick={handleClick}
        className="
          rounded-e-full rounded-s-sm h-12 ps-4 pe-5 bg-blue-800
          outline-none focus:outline-solid focus:outline-offset-2
          focus:outline-2 focus:outline-blue-400 hover:bg-blue-700
          cursor-pointer text-zinc-100 font-bold
          disabled:bg-zinc-800 disabled:text-zinc-500
        "
      >
        ADD
      </button>
    </div>
  )
}
