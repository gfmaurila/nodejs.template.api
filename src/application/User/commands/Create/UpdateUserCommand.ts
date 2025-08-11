import { UserDto } from "@/application/User/dtos/UserDto";
import { UserRepository } from "@/infrastructure/repositories/UserRepository";
import { Password } from "@/core/util/Password";

export class UpdateUserCommand {
  constructor(private readonly Repository: UserRepository) {}
  public async Handle(id: number, dto: UserDto): Promise<void> {
    const hashed = Password.ComputeSha256Hash(dto.Senha);
    await this.Repository.UpdateAsync(id, { ...dto, Senha: hashed });
  }
}
