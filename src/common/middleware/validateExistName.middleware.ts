import { NestMiddleware, Injectable, Type, HttpStatus } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Messages } from "../constants/messages";

export function validateExistNameMiddlewareFactory(
  entity: Type<any>
): Type<NestMiddleware> {
  @Injectable()
  class ValidateExistRoleMiddleware implements NestMiddleware {
    constructor(
      @InjectRepository(entity) private readonly repository: Repository<any>
    ) {}

    async use(req: Request, res: Response, next: NextFunction) {
      try {
        const name = req.body.name;
        const exist_name = await this.repository.findOne({
          where: { name: name },
        });

        if (exist_name) {
          return res.status(HttpStatus.BAD_REQUEST).json(Messages.nameExist);
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

  return ValidateExistRoleMiddleware;
}



export function validateExistNameInEditMiddlewareFactory(
  entity: Type<any>
): Type<NestMiddleware> {
  @Injectable()
  class ValidateExistRoleMiddleware implements NestMiddleware {
    constructor(
      @InjectRepository(entity) private readonly repository: Repository<any>
    ) {}

    async use(req: Request, res: Response, next: NextFunction) {
      try {
        const name = req.body.name;
        const id = req.params.id;
        const register = await this.repository.findOne({
          where: { id: id },
        });

        if (!register) {
          return res.status(HttpStatus.BAD_REQUEST).json({
            status: false,
            message: "The record does not exist",
            message_es: "El registro no existe"
          });
        }

        if (name === register.name && register.id != id) {
          return res.status(HttpStatus.BAD_REQUEST).json(Messages.nameExist);
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

  return ValidateExistRoleMiddleware;
}
