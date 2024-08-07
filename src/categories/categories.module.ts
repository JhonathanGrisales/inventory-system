import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CategoriesController } from "./categories.controller";
import { Category } from "./entities/category.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  validateExistNameMiddlewareFactory,
  validateExistNameInEditMiddlewareFactory,
} from "src/common/middleware/validateExistName.middleware";
import { StandardMessagesModule } from "src/standard-messages/standard-messages.module";
import { validateCategoryMiddleware } from "./middleware/validateCategory.middleware";

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [TypeOrmModule.forFeature([Category]), StandardMessagesModule],
})
export class CategoriesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(validateExistNameMiddlewareFactory(Category))
      .forRoutes({ path: "categories", method: RequestMethod.POST });
    consumer
      .apply(validateExistNameInEditMiddlewareFactory(Category))
      .forRoutes({ path: "categories/:id", method: RequestMethod.PUT });
    consumer
      .apply(validateCategoryMiddleware)
      .forRoutes(
        { path: "categories/:id", method: RequestMethod.PUT },
        { path: "categories/:id", method: RequestMethod.DELETE }
      );
  }
}
