import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: "varchar",
    length: 256,
    nullable: false,
    default: "",
  })
  title: string

  @Column({
    type: "boolean",
    nullable: false,
    default: false,
  })
  done: boolean
}
