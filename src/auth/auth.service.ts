import { Injectable } from "@nestjs/common";
import { LoginUserDto } from './dto/login.user.dto';

@Injectable()
export class AuthService {
  constructor() {}
  login(loginUserDto: LoginUserDto) {

    console.log('Hello world')
    return "Login user";
  }
}
