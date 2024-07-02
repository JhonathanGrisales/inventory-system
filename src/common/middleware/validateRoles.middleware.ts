import { HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { RolesService } from "../../roles/roles.service";
import { Messages } from "../constants/messages";

@Injectable()
export class validateExistRoleMiddleware implements NestMiddleware {
  constructor(private readonly roleService: RolesService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const { role_id } = req.body;
      const role = await this.roleService.getRoleById(role_id);

      if (!role) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json(Messages.messageRoleNotExist);
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
