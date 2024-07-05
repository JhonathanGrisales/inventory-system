import { TypeOrmModule } from "@nestjs/typeorm";
import { MiddlewareConsumer, Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { Users } from "./entities/users.entity";
import { ConfirmUserMiddleware, ValidateUserMiddleware } from "./middleware/registerUser.middleware";
import { RolesModule } from "src/roles/roles.module";
import { Status } from "../common/entities/status.entity";
import { StandardMessagesModule } from "src/standard-messages/standard-messages.module";
import { SendMailsModule } from "src/send-mails/send-mails.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([Users, Status]),
    RolesModule,
    StandardMessagesModule,
    SendMailsModule,
  ],
  exports: [UsersService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateUserMiddleware).forRoutes("users/register");
    consumer.apply(ConfirmUserMiddleware).forRoutes("users/confirm");
  }
}
