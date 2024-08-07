import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Res,
  Put,
} from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { StandardMessagesService } from "../standard-messages/standard-messages.service";
import { Response } from "express";

@Controller("categories")
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly standardMessagesService: StandardMessagesService
  ) {}

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Res() res: Response
  ) {
    try {
      await this.categoriesService.create(createCategoryDto);
      return res
        .status(HttpStatus.CREATED)
        .json(this.standardMessagesService.created("category", "categoría"));
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(
          this.standardMessagesService.error(
            "creada",
            "categoría",
            "created",
            "category",
            error
          )
        );
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const data = await this.categoriesService.findAll();
      res
        .status(HttpStatus.CREATED)
        .json(
          this.standardMessagesService.retrieved("category", "categoría", data)
        );
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(
          this.standardMessagesService.error(
            "retornar",
            "categoría",
            "retrieved",
            "category",
            error
          )
        );
    }
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Res() res: Response
  ) {
    try {
      await this.categoriesService.update(+id, updateCategoryDto);
      return res
        .status(HttpStatus.CREATED)
        .json(this.standardMessagesService.updated("category", "categoría"));
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(
          this.standardMessagesService.error(
            "editando",
            "categoría",
            "updating",
            "category",
            error
          )
        );
    }
  }

  @Delete(":id")
  async remove(@Param("id") id: number, @Res() res: Response) {
    try {
      await this.categoriesService.remove(+id);
      return res
        .status(HttpStatus.CREATED)
        .json(this.standardMessagesService.deleted("category", "categoría"));
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(
          this.standardMessagesService.error(
            "eliminando",
            "categoría",
            "deleting",
            "category",
            error
          )
        );
    }
  }
}
