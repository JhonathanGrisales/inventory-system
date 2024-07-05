import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database/database.module";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { LoggerMiddleware, PasswordMiddleware } from "./auth/middleware/logger.middleware";
import { DateModule } from './date/date.module';
import configuration from "./config/configuration";
import { RolesModule } from './roles/roles.module';
import { validateExistRoleMiddleware } from "./common/middleware/validateRoles.middleware";
import { StandardMessagesModule } from './standard-messages/standard-messages.module';
import { SendMailsModule } from './send-mails/send-mails.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    PassportModule.register({ defaultStrategy: "jwt" }),
    DateModule,
    RolesModule,
    StandardMessagesModule,
    SendMailsModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("auth/login");
    consumer.apply(PasswordMiddleware).forRoutes("auth/login");
    consumer.apply(validateExistRoleMiddleware).forRoutes("users/register");
  }
}
