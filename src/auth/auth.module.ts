import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/users/entities/users.entity";
import { UsersModule } from "src/users/users.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { DateService } from "src/date/date.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, DateService],
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("jwt.secret"),
        signOptions: {
          expiresIn: configService.get<string>("jwt.time_expired"),
        },
      }),
    }),
    TypeOrmModule.forFeature([Users]),
    forwardRef(() => UsersModule)
  ],
  exports: [JwtModule, PassportModule, AuthService],
})
export class AuthModule {}
