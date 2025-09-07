import { ApiProperty } from "@nestjs/swagger"

export class TaskDto {
  @ApiProperty({
    example: 123,
    description: "ID of the task",
  })
  id: number

  @ApiProperty({
    example: "Buy groceries",
    description: "Title of the task",
  })
  title: string

  @ApiProperty({
    example: false,
    description: "Task completion status (true = done, false = not done)",
  })
  done: boolean
}
