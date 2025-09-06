import { createFileRoute } from "@tanstack/react-router"
import { AddTaskForm } from "./-AddTaskForm"
import { TasksList } from "./-TasksList"

export const Route = createFileRoute("/(home)/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="p-4 flex flex-col gap-5 max-w-120 mx-auto">
      <h1 className="text-center font-black text-zinc-100 text-4xl">TODO</h1>

      <AddTaskForm />

      <TasksList />
    </div>
  )
}
