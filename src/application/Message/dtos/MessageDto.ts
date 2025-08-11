import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class MessageDto {
  @IsString() @IsNotEmpty() @MaxLength(100)
  Sender!: string;

  @IsString() @IsNotEmpty() @MaxLength(100)
  Recipient!: string;

  @IsString() @IsNotEmpty() @MaxLength(2000)
  Content!: string;
}
