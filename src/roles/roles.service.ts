import { Injectable } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Roles } from "./entities/roles.entity";
import { Repository } from "typeorm";

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private roleRepository: Repository<Roles>
  ) {}
  create(createRoleDto: CreateRoleDto) {
    return "This action adds a new role";
  }

  getAllRoles() {
    
    return this.roleRepository.find()

  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  getRoleById(uid: string) {
    return this.roleRepository.findOneBy({ uid });
  }
}
