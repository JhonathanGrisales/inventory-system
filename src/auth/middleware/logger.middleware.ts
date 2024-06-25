import * as bcrypt from "bcrypt";
import { HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { UsersService } from "src/users/users.service";
import { Messages } from "src/common/constants/messages";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const user = await this.usersService.getUserByEmail(email);

      if (!user) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json(Messages.messageUnamortized);
      }

      if (user.status.name !== "Activo") {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json(Messages.messageUnamortized);
      }

      next();
    } catch (error) {
      Messages.InternalServerError.error = error.message;
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(Messages.InternalServerError);
    }
  }
}

@Injectable()
export class PasswordMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const user = await this.usersService.getUserByEmail(email);

    const isMatch = await bcrypt.compare(password.trim(), user.password.trim());

    if (!isMatch) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json(Messages.messageUnamortized);
    }

    next();
  }
}
