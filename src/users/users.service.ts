import * as bcrypt from "bcrypt"
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./entities/users.entity";
import { Repository } from "typeorm";
import { RegisterUserDto } from "./dto/register.user.dto";
import { RolesService } from '../roles/roles.service';
import { Status } from "../common/entities/status.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
    private rolesService: RolesService
  ) {}

  async getUserByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
      relations: ["role", "status"],
    });
  }

  async registerNewUser(registerUserDto: RegisterUserDto) {
    const user = new Users();
    const role = await this.rolesService.getRoleById(registerUserDto.role_id);
    const status = await this.statusRepository.findOne({
      where: { name: "Activo" },
    });

    user.email = registerUserDto.email;
    user.name = registerUserDto.name;
    user.password = bcrypt.hashSync(registerUserDto.password, 10);
    user.role = role;
    user.status = status;
    user.phone = registerUserDto.phone;
    user.address = registerUserDto.address;

    await this.usersRepository.save(user);

  }
}
