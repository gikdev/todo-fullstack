import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { apiReference } from "@scalar/nestjs-api-reference"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  app.enableCors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })

  // Swagger & Scalar config
  const config = new DocumentBuilder()
    .setTitle("TODO app API")
    .setDescription("This is a simple full-stack project I'm tryin' to do")
    .addServer("http://localhost:3000")
    .setVersion("1.0")
    .build()
  const doc = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup("api/swagger", app, doc, {
    jsonDocumentUrl: "api/swagger/json",
  })

  app.use(
    "/api/reference",
    apiReference({
      content: doc,
      theme: "elysiajs",
      layout: "classic",
    }),
  )

  app.setGlobalPrefix("api")

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
