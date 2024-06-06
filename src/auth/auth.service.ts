import { Injectable } from "@nestjs/common";
import { LoginUserDto } from "./dto/login.user.dto";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { Users } from "src/users/entities/users.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AuthService {
  constructor(
    private jwtTokenService: JwtService,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>
  ) {}
  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersRepository.findOne({
      where: { email: loginUserDto.email },
    });

    const payload = { username: user.name, uid: user.uid };
    return {
      access_token: this.jwtTokenService.sign(payload),
    };
  }
}
