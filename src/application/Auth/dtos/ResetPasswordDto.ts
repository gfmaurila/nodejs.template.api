import { IsNotEmpty, MinLength } from "class-validator";

export class ResetPasswordDto {
  @IsNotEmpty()
  Code!: string;

  @IsNotEmpty()
  @MinLength(6)
  NewPassword!: string;
}
