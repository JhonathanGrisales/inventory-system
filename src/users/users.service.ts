import * as bcrypt from "bcrypt";
import * as crypto from "crypto-js";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./entities/users.entity";
import { Repository } from "typeorm";
import { RegisterUserDto } from "./dto/register.user.dto";
import { RolesService } from "../roles/roles.service";
import { Status } from "../common/entities/status.entity";
import { SendMailsService } from "src/send-mails/send-mails.service";
import { send_mail_active_account } from "../common/constants/html-email-templates";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
    private rolesService: RolesService,
    private sendMailsService: SendMailsService
  ) {}

  async getUserByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
      relations: ["role", "status"],
    });
  }

  async registerNewUser(registerUserDto: RegisterUserDto) {
    try {
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
      user.is_confirmed = false;
      user.confirmation_token = crypto.lib.WordArray.random(32).toString(
        crypto.enc.Hex
      );

      const message_subject = "Confirma tu cuenta !!! 😀";
      const template_html = send_mail_active_account(user.name, user.confirmation_token);

      const send_mail = await this.sendMailsService.sendMail(
        user.email,
        message_subject,
        template_html
      );
      if (send_mail === 202) await this.usersRepository.save(user);

      return;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async confirmRegisterUser(token: string) {
    try {

      const user = await this.usersRepository.findOne({
        where: { confirmation_token: token },
      });
      
      user.is_confirmed = true;
      user.confirmation_token = null;
   
      await this.usersRepository.save(user)

    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
