import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNotEmpty } from "class-validator"

export class PatchTaskDoneDto {
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    type: "boolean",
    example: true,
    description: "Task completion status (true = done, false = not done)",
  })
  done: boolean
}
