import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from "@nestjs/common"
import { TasksService } from "./tasks.service"
import { CreateTaskDto } from "./create-task.dto"
import { PatchTaskDoneDto } from "./patch-task-done.dto"
import {
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
} from "@nestjs/swagger"
import { Task } from "./task"

@ApiTags("Tasks")
@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: "Retrieve all tasks" })
  @ApiOkResponse({
    description: "List of all tasks",
    type: Task,
    isArray: true,
  })
  getAllTasks() {
    return this.tasksService.findAll()
  }

  @Post()
  @ApiOperation({ summary: "Create a new task" })
  @ApiCreatedResponse({
    description: "The task has been successfully created",
    type: Task,
  })
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto.title)
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Delete a task by its ID" })
  @ApiParam({
    name: "id",
    type: "string",
    format: "uuid",
    required: true,
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "The UUID of the task to delete",
  })
  @ApiOkResponse({ description: "Task successfully deleted", type: Task })
  @ApiNotFoundResponse({ description: "Task not found" })
  removeTask(@Param("id", new ParseUUIDPipe({ version: "4" })) id: string) {
    return this.tasksService.remove(id)
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Update a task’s completion status" })
  @ApiParam({
    name: "id",
    type: "string",
    format: "uuid",
    required: true,
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "The UUID of the task to update",
  })
  @ApiOkResponse({ description: "Task status updated", type: Task })
  @ApiNotFoundResponse({ description: "Task not found" })
  updateTaskDone(
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
    @Body() patchTaskDoneDto: PatchTaskDoneDto,
  ) {
    return this.tasksService.toggleTaskDone(id, patchTaskDoneDto.done)
  }
}
