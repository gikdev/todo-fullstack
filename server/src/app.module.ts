import { Module } from "@nestjs/common"
import { TasksModule } from "./tasks/tasks.module"
import { ServeStaticModule } from "@nestjs/serve-static"
import { join } from "node:path"

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "../..", "client", "dist"),
    }),
    TasksModule,
  ],
})
export class AppModule {}
