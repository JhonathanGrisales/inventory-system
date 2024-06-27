import { Injectable } from "@nestjs/common";
import { LoginUserDto } from "./dto/login.user.dto";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { Users } from "src/users/entities/users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DateService } from "src/date/date.service";

@Injectable()
export class AuthService {
  constructor(
    private jwtTokenService: JwtService,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly dateService: DateService
  ) {}
  async login(loginUserDto: LoginUserDto) {
    try {
      const date_now = new Date();
      const user = await this.usersRepository.findOne({
        where: { email: loginUserDto.email },
      });

      user.last_login = this.dateService.getDateFormat(
        date_now,
        "yyyy-MM-dd HH:mm:ss"
      );

      await this.usersRepository.save(user);

      const payload = { username: user.name, uid: user.uid };
      return {
        user_name: user.name,
        token: this.jwtTokenService.sign(payload),
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
