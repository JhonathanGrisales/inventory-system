import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/login.user.dto";
import { Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    try {
      const login = await this.authService.login(loginUserDto);

      return res.status(HttpStatus.OK).json({
        status: true,
        message: "Login successful",
        message_es: "Inicio de sesión exitoso",
        user: login,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: true,
        message: "Failed to login",
        message_es: "Error al iniciar sesión",
        error: error.message
      });
    }
  }
}
