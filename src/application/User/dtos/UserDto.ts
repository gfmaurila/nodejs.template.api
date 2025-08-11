import { IsEmail, IsNotEmpty, MaxLength, MinLength, IsOptional } from "class-validator";

export class UserDto {
  @IsNotEmpty() @MaxLength(100)
  Name!: string;

  @IsEmail() @MaxLength(100)
  Email!: string;

  @IsNotEmpty() @MinLength(6)
  Senha!: string;

  @IsOptional() @MaxLength(20)
  Phone?: string;
}
