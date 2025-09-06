import { Injectable, NotFoundException } from "@nestjs/common"
import { Task } from "./task"
import { v4 as uuidv4 } from "uuid"

@Injectable()
export class TasksService {
  tasks: Task[] = []

  findAll() {
    return this.tasks
  }

  create(title: Task["title"]) {
    const newTask: Task = {
      id: uuidv4(),
      title,
      done: false,
    }

    this.tasks.push(newTask)
    return newTask
  }

  remove(id: Task["id"]) {
    const index = this.tasks.findIndex(t => t.id === id)
    if (index === -1)
      throw new NotFoundException(`Task with ID: ${id} was not found!`)

    const [removedTask] = this.tasks.splice(index, 1)
    return removedTask
  }

  toggleTaskDone(id: Task["id"], newDone: Task["done"]) {
    const task = this.tasks.find(t => t.id === id)
    if (!task) throw new NotFoundException(`Task with ID: ${id} was not found!`)

    task.done = newDone
    return task
  }
}
