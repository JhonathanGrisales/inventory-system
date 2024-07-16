import { Body, Controller, HttpStatus, Post, Query, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { RegisterUserDto } from "./dto/register.user.dto";
import { UsersService } from "./users.service";
import { StandardMessagesService } from "../standard-messages/standard-messages.service";
import { AuthGuard } from "../auth/guards/auth.guard";

@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly standardMessagesService: StandardMessagesService,
    
  ) {}


  @UseGuards(AuthGuard)
  @Post("/register")
  async getAllUser(
    @Body() registerUserDto: RegisterUserDto,
    @Res() res: Response
  ) {
    try {
      this.usersService.registerNewUser(registerUserDto);
      return res
        .status(HttpStatus.CREATED)
        .json(this.standardMessagesService.created("user", "usuario"));
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(
          this.standardMessagesService.error(
            "crear",
            "usuario",
            "create",
            "user",
            error
          )
        );
    }
  }

  @Post("/confirm")
  async confirmRegisterUser(@Query('token') token: string, @Res() res: Response) {
    try {
      await this.usersService.confirmRegisterUser(token);
      return res
        .status(HttpStatus.CREATED)
        .json(this.standardMessagesService.updated("user", "usuario"));
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(
          this.standardMessagesService.error(
            "actualizar",
            "usuario",
            "update",
            "user",
            error
          )
        );
    }
  }
}
