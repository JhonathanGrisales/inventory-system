import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./entities/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private productsRepository: Repository<Users>
  ) {}

  async getAllUser() {
    try {
      return this.productsRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }
}
