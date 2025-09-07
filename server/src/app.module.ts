import { Module } from "@nestjs/common"
import { TasksModule } from "./tasks/tasks.module"
import { ServeStaticModule } from "@nestjs/serve-static"
import { join } from "node:path"
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: "postgres",
        entities: [`${__dirname}/**/*.entity.{ts,js}`],
        synchronize: true,
        port: 5432,
        username: "postgres",
        password: "mmsfllfbns",
        host: "localhost",
        database: "todo-fullstack",
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "../..", "client", "dist"),
    }),
    TasksModule,
  ],
})
export class AppModule {}
