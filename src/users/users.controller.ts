import { Body, Controller, Post} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register.user.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async getAllUser( @Body() registerUserDto: RegisterUserDto ) {
    
    this.usersService.registerNewUser()
  }
}
