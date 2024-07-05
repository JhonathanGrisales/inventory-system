import { HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UsersService } from "../../users/users.service";
import { Messages } from "../../common/constants/messages";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../entities/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class ValidateUserMiddleware implements NestMiddleware {
  constructor(
    private userService: UsersService
  ) {}

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
@Injectable()
export class ConfirmUserMiddleware implements NestMiddleware {
  constructor(
    private userService: UsersService,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.query;

      const user = await this.usersRepository.findOne({
        where: { confirmation_token: token.toString() },
      });

      if (!user) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json(Messages.messageTokenInvalid);
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
