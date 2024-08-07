import { HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { Messages } from "../../common/constants/messages";
import { CategoriesService } from "../categories.service";

@Injectable()
export class validateCategoryMiddleware implements NestMiddleware {
  constructor(private readonly categoriesService: CategoriesService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const category = await this.categoriesService.findOne(+id);

      if (!category) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json(Messages.messageCategoryNotExist);
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
