import { HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { UsersService } from "src/users/users.service";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const user = await this.usersService.getUserByEmail(email);

    const messageFail = {
      status: false,
      message: "Unauthorized",
      message_es: "No autorizado",
    };

    if (!user) {
      return res.status(HttpStatus.UNAUTHORIZED).json(messageFail);
    }

    if (password != user.password) {
      return res.status(HttpStatus.UNAUTHORIZED).json(messageFail);
    }

    next();
  }
}
