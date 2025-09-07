import { Injectable, NotFoundException } from "@nestjs/common"
import { TaskDto } from "./task.dto"
import { Repository } from "typeorm"
import { Task } from "./task.entity"
import { InjectRepository } from "@nestjs/typeorm"
import { CreateTaskDto } from "./create-task.dto"
import { plainToInstance } from "class-transformer"

@Injectable()
export class TasksService {
  tasks: TaskDto[] = []

  constructor(
    @InjectRepository(Task)
    private readonly tasksRepo: Repository<Task>,
  ) {}

  async findAll() {
    const tasks = await this.tasksRepo.find()
    return plainToInstance(TaskDto, tasks)
  }

  async create(createTaskDto: CreateTaskDto) {
    const newTask = this.tasksRepo.create(createTaskDto)
    const savedNewTask = await this.tasksRepo.save(newTask)
    return plainToInstance(TaskDto, savedNewTask)
  }

  async remove(id: TaskDto["id"]) {
    const task = await this.tasksRepo.findOneBy({ id })
    if (!task) throw new NotFoundException(`Task with ID: ${id} was not found!`)

    const taskDto = plainToInstance(TaskDto, task)
    await this.tasksRepo.remove(task)
    return taskDto
  }

  async toggleTaskDone(id: TaskDto["id"], newDone: TaskDto["done"]) {
    const task = await this.tasksRepo.findOneBy({ id })
    if (!task) throw new NotFoundException(`Task with ID: ${id} was not found!`)

    task.done = newDone
    const udpatedTask = await this.tasksRepo.save(task)
    return plainToInstance(TaskDto, udpatedTask)
  }
}
