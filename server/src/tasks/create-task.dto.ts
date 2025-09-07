import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(256)
  @ApiProperty({
    type: "string",
    example: "Study math",
    description: "Title of the task you want to create.",
  })
  title: string
}
