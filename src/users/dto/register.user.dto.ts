import { IsEmail, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export class RegisterUserDto {
    
  @IsString()
  name: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @MaxLength(30)
  @MinLength(5)
  password: string;

  @IsUUID()
  @IsString()
  role_id: string

  @IsString()
  phone: string

  @IsString()
  address: string
  
}
    