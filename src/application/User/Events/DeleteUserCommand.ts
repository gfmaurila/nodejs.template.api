import { UserRepository } from "@/infrastructure/repositories/UserRepository";

export class DeleteUserCommand {
  constructor(private readonly Repository: UserRepository) {}
  public async Handle(id: number): Promise<void> {
    await this.Repository.DeleteAsync(id);
  }
}
