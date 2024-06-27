import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger("Bootstrap");
  const configureService = app.get(ConfigService);
  app.setGlobalPrefix("api");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  await NestFactory.create(AppModule, { cors: true });
  await app.listen(configureService.get<number>('PORT'));
  logger.log(`App running on port ${configureService.get<number>('PORT')}`);
}
bootstrap();
