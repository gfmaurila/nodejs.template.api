import { UserDto } from "@/application/User/dtos/UserDto";
import { UserRepository } from "@/infrastructure/repositories/UserRepository";
import { Password } from "@/core/util/Password";

export class CreateUserCommand {
  constructor(private readonly Repository: UserRepository) {}
  public async Handle(dto: UserDto) {
    const hashed = Password.ComputeSha256Hash(dto.Senha);
    return await this.Repository.CreateAsync({ ...dto, Senha: hashed });
  }
}
