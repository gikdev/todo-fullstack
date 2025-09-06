import { ApiProperty } from "@nestjs/swagger"

export class Task {
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "ID of the task",
  })
  id: string

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
