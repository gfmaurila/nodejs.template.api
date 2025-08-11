import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class AuthCommand {
  @IsEmail()
  Email!: string;

  @IsNotEmpty()
  @MinLength(6)
  Password!: string;
}
