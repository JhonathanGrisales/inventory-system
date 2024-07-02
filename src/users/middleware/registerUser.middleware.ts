import { HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UsersService } from "../../users/users.service";
import { Messages } from "../../common/constants/messages";

@Injectable()
export class ValidateUserMiddleware implements NestMiddleware {
  constructor(private userService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const user = await this.userService.getUserByEmail(email);

      if (user) {
        return res
          .status(HttpStatus.CONFLICT)
          .json(Messages.messageExistEmailInUser);
      }

      next()
    } catch (error) {
      Messages.InternalServerError.error = error.message;
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(Messages.InternalServerError);
    }
  }
}
